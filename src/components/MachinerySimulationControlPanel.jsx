import { useEffect, useState } from "react";
import axios from "axios";

function MachinerySimulationControlPanel() {
  // this panel will update the database directly

  const [isDoorLocked, setIsDoorLocked] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [coins, setCoins] = useState([]);

  async function fetchDrinks() {
    const { data } = await axios.get(`http://127.0.0.1:8080/api/drinks`);
    setDrinks(data);
  }

  async function fetchCoins() {
    const { data } = await axios.get(`http://127.0.0.1:8080/api/coins`);
    setCoins(data);
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
      <table className="m-1 p-1 w-full">
        <thead>
          <th className="border-none"></th>
          <th className="w-56 capitalize bg-primary">
            display/enter new value
          </th>
        </thead>
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink.id}>
              <td className="text-center bg-primary">
                Number of drink cans of brand {drink.brand}
              </td>
              <td className="text-center bg-secondary">{drink.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Coin */}
      <table className="m-1 p-1 w-full">
        <thead>
          <th className="border-none"></th>
          <th className="w-56 capitalize bg-primary">
            display/enter new value
          </th>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td className="text-center bg-primary">
                Number of {coin.denomination} coins
              </td>
              <td className="text-center bg-secondary">{coin.quantity}</td>
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
            <div className="m-2 p-2 border border-black bg-secondary w-1/2 text-center button-on">
              Locked
            </div>
            <div className="m-2 p-2 border border-black bg-secondary w-1/2 text-center">
              Unlocked
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-56">
            <div className="m-2 p-2 border border-black bg-secondary w-1/2 text-center">
              Locked
            </div>
            <div className="m-2 p-2 border border-black bg-secondary w-1/2 text-center button-on">
              Unlocked
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MachinerySimulationControlPanel;
