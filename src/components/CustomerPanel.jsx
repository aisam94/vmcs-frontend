import { useState, useEffect } from "react";
import axios from "axios";

function CustomerPanel() {
  const [totalMoney, setTotalMoney] = useState(0);
  const [coinsArray, setCoinsArray] = useState([]);
  const [totalChange, setTotalChange] = useState(0);
  const [isCoinValid, setIsCoinValid] = useState(false);
  const [isTerminateTransaction, setIsTerminateTransaction] = useState(false);

  const [drinks, setDrinks] = useState([]);
  const [coins, setCoins] = useState([]);
  const [coinSelected, setCoinSelected] = useState();
  const [drinkSelected, setDrinkSelected] = useState();

  async function fetchDrinks() {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/drinks`);
    setDrinks(data?.drinks);
  }

  async function fetchCoins() {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/coins`);
    setCoins(data?.coins);
  }

  function selectCoin(id) {
    if (id === "invalid") {
      setCoinSelected("invalid");
      // setTotalMoney(0);
      // setCoinsArray([]);
      return;
    }
    for (let i = 0; i < coins?.length; i++) {
      if (id === coins[i]["id"]) {
        setCoinSelected(coins[i]);
        let newTotal = +(totalMoney + coins[i].value).toFixed(2);
        setTotalMoney(newTotal);
        setCoinsArray([...coinsArray, coins[i].id]);
        console.log(coinsArray);
      }
    }
  }

  function selectDrink(id) {
    for (let i = 0; i < drinks?.length; i++) {
      if (id === drinks[i]["id"]) {
        setDrinkSelected(drinks[i]);
      }
    }
  }

  function getChange(price) {
    return +(totalMoney - price).toFixed(2);
  }

  function buyDrink(drink) {
    //select drink
    selectDrink(drink.id);

    // dispense drink
    axios
      .post(`http://localhost:8000/api/drinks/purchase`, {
        coins: coinsArray,
        drinks_id: drink.id,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("successful dispensing drink");
        }
      })
      .catch((e) => {
        console.log("fail dispensing drink");
      });

    // calculate change
    let change = getChange(drink.price);
    setTotalChange(change);

    //reset total money
    setTotalMoney(0);
    setCoinsArray([]);
    // how about drink and coin list
  }

  function terminateTransaction() {
    //reset everything
    setTotalMoney(0);
    setCoinsArray([]);
    setTotalChange(0);
    setCoinSelected();
    setDrinkSelected();
  }

  function giveOutChange() {
    // if drink is not selected then terminate transaction
    console.log(drinkSelected);
    if (!drinkSelected) {
      terminateTransaction();
      console.log("terminate transaction");
      return;
    }
    console.log("give out change");
    setTotalChange(0);
    setDrinkSelected();
  }

  useEffect(() => {
    fetchDrinks();
    fetchCoins();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="mt-3 text-center capitalize text-primary">
        customer panel
      </h1>

      {/* Input Coin Section */}

      <div className="flex py-2 w-full text-center bg-secondary justify-evenly mt-1">
        <button key={0} onClick={() => selectCoin("invalid")}>
          Invalid coin
        </button>

        {coins?.map((value, index) => {
          return (
            <button key={index + 1} onClick={() => selectCoin(value.id)}>
              {value.type}
            </button>
          );
        })}
      </div>
      <div className="grid my-2 grid-cols-2 grid-rows-2">
        <div className="flex p-1 bg-primary items-center">
          <span className="capitalize">insert coin here</span>
          <div className="io-interface ml-auto mr-5"></div>
        </div>
        {coinSelected === "invalid" ? (
          <div className="flex p-1 bg-secondary items-center justify-center capitalize button-error">
            coins not valid
          </div>
        ) : (
          <div className="flex p-1 bg-secondary items-center justify-center capitalize text-black">
            coins not valid
          </div>
        )}
        <div className="flex my-1 px-1 py-2 bg-primary items-center capitalize">
          total money inserted
        </div>
        <div className="flex my-1 p-1 bg-secondary items-center justify-center">
          RM {totalMoney.toFixed(2)}
        </div>
      </div>

      {/* Selection Table */}
      <table className="my-5 p-1 border-collapse border-solid border-white border-1 bg-secondary">
        <thead className="bg-primary">
          <tr>
            <th>Select Drinks Brand Below</th>
            <th>Price (RM)</th>
            <th>Availability</th>
            <th>Press To Select</th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((drink) =>
            drink.count === 0 || totalMoney < drink.price ? (
              <tr className="text-black" key={drink.id}>
                <td className="text-center">{drink.brand}</td>
                <td className="text-right px-2 py-1">
                  {drink.price.toFixed(2)}
                </td>
                <td className="text-center">
                  {drink.count > 0 ? "In Stock" : "Not In Stock"}
                </td>
                <td className="text-center">Press</td>
              </tr>
            ) : (
              <tr className="" key={drink.id}>
                <td className="text-center">{drink.brand}</td>
                <td className="text-right px-2 py-1">
                  {drink.price.toFixed(2)}
                </td>
                <td className="text-center">
                  {drink.count > 0 ? "In Stock" : "Not In Stock"}
                </td>
                <td
                  className="text-center hover:cursor-pointer hover:bg-secondary-highlight"
                  onClick={() => buyDrink(drink)}
                >
                  Press
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Change notification section */}
      <div className="panelbar p-2 bg-primary justify-center capitalize">
        {totalChange === 0 ? (
          <div>no change available</div>
        ) : (
          <div>RM {totalChange.toFixed(2)}</div>
        )}
      </div>

      {/* Return cash/ Terminate transaction */}
      <div className="panelbar p-1 items-center bg-primary justify-between">
        <div className="">
          Press here to return cash/change and terminate transaction here
        </div>
        <button onClick={() => giveOutChange()}>Press</button>
      </div>

      {/* Change dispenser */}
      <div className="panelbar items-center justify-between bg-primary p-1 capitalize">
        <div>collect change/ returned cash here</div>
        <div className="io-interface ml-auto mr-5"></div>
      </div>

      {/* Drinks dispenser */}
      <div className="panelbar bg-primary p-1 justify-between capitalize">
        <div>collect can here</div>
        <div className="io-interface ml-auto mr-5"></div>
      </div>
    </div>
  );
}

export default CustomerPanel;
