function MachinerySimulationControlPanel() {
  const drinksBrand = [
    { name: "Koca-kola", price: 10.0, availability: true, numLeft: 10 },
    { name: "Bepsi", price: 5.0, availability: false, numLeft: 10 },
    { name: "Manta", price: 15.0, availability: false, numLeft: 10 },
  ];

  const coinStash = [
    {
      value: "10c",
      available: 10,
    },
    {
      value: "20c",
      available: 10,
    },
    {
      value: "50c",
      available: 10,
    },
    {
      value: "RM1",
      available: 10,
    },
  ];

  return (
    <div className="flex flex-col space-y-10">
      <h1 className="mt-3 capitalize text-primary">machinery simulation control panel</h1>

      {/* Drinks availability */}
      <table className="m-1 p-1 w-full">
        <thead>
          <th className="border-none"></th>
          <th className="w-56 capitalize bg-primary">display/enter new value</th>
        </thead>
        <tbody>
          {drinksBrand.map((drink) => (
            <tr>
              <td className="text-center bg-primary">Number of drink cans of brand {drink.name}</td>
              <td className="text-center bg-secondary">{drink.numLeft}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Coin availability */}
      <table className="m-1 p-1 w-full">
        <thead>
          <th className="border-none"></th>
          <th className="w-56 capitalize bg-primary">display/enter new value</th>
        </thead>
        <tbody>
          {coinStash.map((coin) => (
            <tr>
              <td className="text-center bg-primary">Number of {coin.value} coins</td>
              <td className="text-center bg-secondary">{coin.available}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Status of Vending Machine */}
      <div className="flex bg-primary justify-between">
        <div className="flex truncate items-center capitalize ml-5">
          status of vending machine door lock (change status if required)
        </div>
        <div className="flex justify-center w-56">
          <div className="m-2 p-2 border border-black bg-secondary w-1/2 text-center">Locked</div>
          <div className="m-2 p-2 border border-black bg-secondary w-1/2 text-center">Unlocked</div>
        </div>
      </div>
    </div>
  );
}

export default MachinerySimulationControlPanel;
