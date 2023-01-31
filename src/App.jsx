import { useState } from "react";
import SimulatorPanel from "./components/SimulatorPanel";

function App() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="">Vending Machine Control System</h1>
      <div>
        <SimulatorPanel />
      </div>
    </div>
  );
}

export default App;
