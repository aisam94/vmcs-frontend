import { useEffect, useState } from "react";
import axios from "axios";

function MaintainerControlPanel({ onClick }) {
  // how to handle password
  // need way to reset denomination
  // is cash term appropriate????
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [coinDenomination, setCoinDenomination] = useState();
  const [totalDenomination, setTotalDenomination] = useState(0);
  const [newDrinkPrice, setNewDrinkPrice] = useState();
  const [totalCashHeld, setTotalCashHeld] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [coins, setCoins] = useState();
  const [coinSelected, setCoinSelected] = useState();
  const [drinkSelected, setDrinkSelected] = useState("");

  async function getCoinData() {
    const coinData = await axios.get(`http://localhost:8000/api/coins`);
    setCoins(coinData?.data?.coins);
  }

  async function fetchDrinks() {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/drinks`);
    setDrinks(data?.drinks);
  }

  async function getTotalCashHeld() {
    let totalCash = 0;
    const { data } = await axios.get(`http://localhost:8000/api/coins`);
    let coins = data.coins;
    for (let i = 0; i < coins?.length; i++) {
      totalCash += coins[i].count * coins[i].value;
    }
    setTotalCashHeld(totalCash);
  }

  function selectCoin(id) {
    for (let i = 0; i < coins?.length; i++) {
      if (id === coins[i]["id"]) {
        setCoinSelected(coins[i]);
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

  function verifyPassword(password) {
    if (password.length === 6) {
      axios
        .post(`http://localhost:8000/api/verify-password`, {
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsPasswordValid(true);
          }
        })
        .catch((e) => {
          console.log("invalid password");
          setIsPasswordValid(false);
        });
    } else {
      setIsPasswordValid(false);
    }
  }

  function updateDrinks(e) {
    if (e.key === "Enter") {
      axios
        .put(`http://localhost:8000/api/drinks/update/${drinkSelected.id}`, {
          price: e.target.value,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("successful updating drinks price");
          }
        })
        .catch((e) => {
          console.log("fail updating drinks price");
        });
    }
  }

  useEffect(() => {
    getCoinData();
    getTotalCashHeld();
    fetchDrinks();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-5 capitalize text-primary">maintainer control panel</h1>

      {/* Input password */}
      <div className="panelbar">
        <span className="p-2 capitalize bg-primary w-1/2 text-center">
          type password here
        </span>
        <input
          type="text"
          className="bg-secondary w-1/2"
          maxLength={6}
          onKeyUp={(e) => verifyPassword(e.target.value)}
        ></input>
      </div>

      {/* Password validity */}
      <div className="flex mx-auto w-full justify-evenly my-1">
        <span
          className={`py-2 px-6 capitalize text-center ${
            !isPasswordValid ? "bg-secondary" : "button-on"
          }`}
        >
          password valid
        </span>
        <span
          className={`py-2 px-6 capitalize text-center ${
            isPasswordValid ? "bg-secondary" : "button-on"
          }`}
        >
          password invalid
        </span>
      </div>

      {isPasswordValid && (
        <div>
          {/* Coin denomination */}
          <div className="flex flex-col items-center my-3 w-full">
            <div className="capitalize bg-primary p-2 w-full text-center">
              press below to determine number of coins in selected denomination
            </div>
            <div className="flex py-2 w-full text-center bg-secondary justify-evenly mt-1">
              {coins?.map((value, index) => {
                return (
                  <button key={index} onClick={() => selectCoin(value.id)}>
                    {value.type}
                  </button>
                );
              })}
            </div>
            <div className="panelbar">
              <div className="capitalize bg-primary w-1/2 p-1 text-center">
                total number of coins in selected denomination
              </div>
              <div className="flex bg-secondary w-1/2 justify-center items-center">
                {coinSelected?.count}
              </div>
            </div>
          </div>

          {/* New drinks price */}
          <div className="grid py-2 grid-cols-3 w-full text-center bg-secondary justify-evenly mt-1">
            {drinks?.map((drink, index) => {
              if (drink.brand === drinkSelected.brand) {
                return (
                  <button
                    className="button-on"
                    key={index}
                    onClick={() => selectDrink(drink.id)}
                  >
                    {drink.brand}
                  </button>
                );
              } else {
                return (
                  <button
                    className=""
                    key={index}
                    onClick={() => selectDrink(drink.id)}
                  >
                    {drink.brand}
                  </button>
                );
              }
            })}
          </div>
          <div className="panelbar">
            <div className="capitalize bg-primary p-2 text-center w-1/2">
              type new drinks can price here
            </div>
            <input
              className="bg-secondary w-1/2"
              type="number"
              pattern="^\d+(?:\.\d{1,2})?$"
              step="0.01"
              onKeyDown={updateDrinks}
            ></input>
          </div>

          {/* Total cash held by machine */}
          <div className="panelbar">
            <div className="bg-primary capitalize w-1/2 text-center p-1">
              {/* press here for total cash held by machine */}
              total cash held by machine
            </div>
            <div className="bg-secondary w-1/2 flex justify-center items-center p-1">
              RM {totalCashHeld.toFixed(2)}
            </div>
          </div>

          {/* Cash collection */}
          <div className="panelbar bg-primary">
            <div className="bg-primary w-1/2 capitalize flex justify-center items-center">
              press here to collect all cash
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <button className="">Press</button>
            </div>
          </div>

          {/* Cash dispenser */}
          <div className="panelbar bg-primary py-1">
            <div className="bg-primary w-1/2 capitalize flex justify-center items-center">
              collect all cash here
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="io-interface"></div>
            </div>
          </div>

          {/* Finish operation */}
          <div className="panelbar bg-primary py-1">
            <div className="bg-primary w-1/2 capitalize flex justify-center items-center">
              press here when finished
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <button className="" onClick={onClick}>
                Press
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MaintainerControlPanel;
