import { useEffect, useState } from "react";
import axios from "axios";

function MachinerySimulationControlPanel() {
  // this panel will update the database directly

  const [isDoorLocked, setIsDoorLocked] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [newDrinks, setNewDrinks] = useState([]);
  const [coins, setCoins] = useState([]);
  const [newCoins, setNewCoins] = useState([]);

  const drinkLimit = 20;
  const coinLimit = 20;

  async function fetchDrinks() {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/drinks`);
    setDrinks(data?.drinks);
    setNewDrinks(data?.drinks);
  }

  async function fetchCoins() {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/coins`);
    setCoins(data?.coins);
    setNewCoins(data?.coins);
  }

  function updateNewDrink(id, newValue) {
    if (isDoorLocked) return;
    if (newValue > drinkLimit || newValue < 0) return;
    let newData = newDrinks.map((e) => {
      if (e.id === id) {
        return { ...e, count: newValue };
      }
      return e;
    });
    setNewDrinks(newData);
  }

  function updateNewCoins(id, newValue) {
    if (isDoorLocked) return;
    if (newValue > coinLimit || newValue < 0) return;
    let newData = newCoins.map((e) => {
      if (e.id === id) {
        return { ...e, count: newValue };
      }
      return e;
    });
    setNewCoins(newData);
  }

  function updateDrink(e, id) {
    if (isDoorLocked) return;
    if (e.key === "Enter") {
      axios
        .put(`http://localhost:8000/api/drinks/update/${id}`, {
          count: e.target.value,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("successful updating drinks");
          }
        })
        .catch((e) => {
          console.log("fail updating drinks");
        });
    }
  }

  function updateCoin(e, id) {
    if (isDoorLocked) return;
    if (e.key === "Enter") {
      axios
        .put(`http://localhost:8000/api/coins/update/${id}`, {
          count: e.target.value,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("successful updating coins");
          }
        })
        .catch((e) => {
          console.log("fail updating coins");
        });
    }
  }

  useEffect(() => {
    fetchDrinks();
    fetchCoins();
  }, []);

  return (
    <div className="flex flex-col space-y-10">
      <h1 className="mt-3 capitalize text-primary">
        machinery simulation control panel
      </h1>

      {/* Drinks */}
      <table className="my-1 p-1 w-full">
        <thead>
          <th className="border-none"></th>
          <th className="w-56 bg-primary">Display/Enter New Value</th>
        </thead>
        <tbody>
          {newDrinks.map((drink) => (
            <tr key={drink.id}>
              <td className="text-center bg-primary">
                Number of drink cans of brand {drink.brand}
              </td>
              <td>
                <input
                  className="text-center bg-secondary"
                  type="number"
                  value={drink.count}
                  onChange={(e) => updateNewDrink(drink.id, e.target.value)}
                  onKeyDown={(e) => updateDrink(e, drink.id)}
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Coin */}
      <table className="my-1 p-1 w-full">
        <thead>
          <th className="border-none"></th>
          <th className="w-56 bg-primary">Display/Enter New Value</th>
        </thead>
        <tbody>
          {newCoins.map((coin) => (
            <tr key={coin.id}>
              <td className="text-center bg-primary">
                Number of {coin.type} coins
              </td>
              <td>
                <input
                  className="text-center bg-secondary"
                  type="number"
                  value={coin.count}
                  onChange={(e) => updateNewCoins(coin.id, e.target.value)}
                  onKeyDown={(e) => updateCoin(e, coin.id)}
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Status of Vending Machine */}
      <div className="flex bg-primary justify-between">
        <div className="flex truncate items-center capitalize ml-5">
          status of vending machine door lock (change status if required)
        </div>
        {isDoorLocked ? (
          <div className="flex justify-center w-56">
            <button className="m-2 p-2 border border-black bg-secondary w-1/2 text-center button-on">
              Locked
            </button>
            <button className="m-2 p-2 border border-black bg-secondary w-1/2 text-center">
              Unlocked
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-56">
            <button
              className="m-2 p-2 border border-black bg-secondary w-1/2 text-center"
              onClick={() => setIsDoorLocked(true)}
            >
              Locked
            </button>
            <button className="m-2 p-2 border border-black bg-secondary w-1/2 text-center button-on">
              Unlocked
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MachinerySimulationControlPanel;
