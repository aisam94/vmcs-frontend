import { useEffect, useState } from "react";
import axios from "axios";

function MaintainerControlPanel() {
  // how to handle password
  // need way to reset denomination
  // is cash term appropriate????
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [coinDenomination, setCoinDenomination] = useState();
  const [totalDenomination, setTotalDenomination] = useState(0);
  const [newDrinkPrice, setNewDrinkPrice] = useState();
  const [totalCashHeld, setTotalCashHeld] = useState(0);
  const [coins, setCoins] = useState();
  const [coinSelected, setCoinSelected] = useState();

  async function getCoinData() {
    const coinData = await axios.get(`http://localhost:8000/api/coins`);
    setCoins(coinData?.data?.coins);
  }

  function getTotalCashHeld() {

    let totalCashHeld = 0;
    axios.get(`http://localhost:8000/api/coins`).then((res) => {
      console.log(res.data.coins);
      for (let i = 0; i < coins?.length; i++) {
        // totalCashHeld += coinValue[data[i].denomination] * data[i].quantity;
        totalCashHeld += coins[i].count * coins[i].value;
      }
      setTotalCashHeld(totalCashHeld);
    });
  }

  function selectCoin(id) {
    for (let i = 0; i < coins?.length; i++) {
      if (id === coins[i]['id']) {
        setCoinSelected(coins[i]);
      }
    }
  }

  function verifyPassword(password) {
    if (password.length == 6) {
      axios.post(`http://localhost:8000/api/verify-password`, {
        "password": password
      }).then((res) => {
        if (res.status === 200) {
          setIsPasswordValid(true);
        }
      }).catch(e => {
        console.log("invalid password");
        setIsPasswordValid(false);
      });
    }
  }

  // function updateDrinks(target) {
  // }

  useEffect(() => {
    getTotalCashHeld();
    getCoinData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-5 capitalize text-primary">maintainer control panel</h1>

      {/* Input password */}
      <div className="panelbar">
        <span className="p-2 capitalize bg-primary w-1/2 text-center">
          type password here
        </span>
        <input type="text" className="bg-secondary w-1/2" maxLength={6} onKeyUp={(e) => verifyPassword(e.target.value)}></input>
      </div>

      {/* Password validity */}
      <div className="flex mx-auto w-full justify-evenly my-1">
        <span className={`py-2 px-6 capitalize text-center ${!isPasswordValid ? 'bg-secondary' :'bg-primary'}`}>
          password valid
        </span>
        <span className={`py-2 px-6 capitalize text-center ${isPasswordValid ? 'bg-secondary' :'bg-primary'}`}>
          password invalid
        </span>
      </div>

      {/* Coin denomination */}
      <div className="flex flex-col items-center my-3 w-full">
        <div className="capitalize bg-primary p-2 w-full text-center">
          press below to determine number of coins in selected denomination
        </div>
        <div className="flex py-2 w-full text-center bg-secondary justify-evenly mt-1">
          {coins?.map((value, index) => {
            return <button key={index} onClick={() => selectCoin(value.id)}>{value.type}</button>
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
      <div className="panelbar">
        <div className="capitalize bg-primary p-2 text-center w-1/2">
          type new drinks can price here
        </div>
        <input className="bg-secondary w-1/2" type="text" onKeyUp={(e) => updateDrinks(e.target.value)}></input>
      </div>

      {/* Total cash held by machine */}
      <div className="panelbar">
        <div className="bg-primary capitalize w-1/2 text-center p-1">
          press here for total cash held by machine
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
          <button className="">Press</button>
        </div>
      </div>
    </div>
  );
}

export default MaintainerControlPanel;
