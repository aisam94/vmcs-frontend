import { useState } from "react";
import SimulatorPanel from "./components/SimulatorPanel";
import CustomerPanel from "./components/CustomerPanel";
import MaintainerControlPanel from "./components/MaintainerControlPanel";
import MachinerySimulationControlPanel from "./components/MachinerySimulationControlPanel";

function App() {
  const [currentPanel, setCurrentPanel] = useState();

  return (
    <div className="flex flex-col items-center">
      <h1 className="">Vending Machine Control System</h1>
      <div>
        {/* <SimulatorPanel />
        <CustomerPanel/>
        <MaintainerControlPanel/>
        <MachinerySimulationControlPanel/> */}

        <SimulatorPanel />
        <CustomerPanel />
        <MaintainerControlPanel />
        <MachinerySimulationControlPanel />
      </div>
    </div>
  );
}

export default App;
