import { useState } from "react";
import PanelActionBar from "./PanelActionBar";
import CustomerPanel from "./CustomerPanel";
import MaintainerControlPanel from "./MaintainerControlPanel";
import MachinerySimulationControlPanel from "./MachinerySimulationControlPanel";

function SimulatorPanel() {
  // current panel should be either '', customerPanel, maintainerPanel, machinerySimulatorPanel
  // only one at a time
  const [currentPanel, setCurrentPanel] = useState("");
  const [isSimulationStarted, setIsSimulationStarted] = useState(false);

  function startSimulation() {
    if (currentPanel !== "") setIsSimulationStarted(true);
  }

  function endSimulation() {
    // only end simulation if simulation has started
    if (!isSimulationStarted) return;
    setIsSimulationStarted(false);
    setCurrentPanel("");
  }

  function setPanel(panel) {
    // can only set panel when simulation is not started
    if (!isSimulationStarted) setCurrentPanel(panel);
  }

  function setEmptyPanel() {
    setCurrentPanel();
  }

  return (
    <div className="m-5 flex flex-col items-center">
      <h1 className="text-primary text-center">Simulator Control Panel</h1>
      <PanelActionBar
        string="begin simulation"
        onClick={startSimulation}
        onStatus={isSimulationStarted}
      />
      <PanelActionBar string="end simulation" onClick={endSimulation} />

      {!isSimulationStarted && (
        <>
          <PanelActionBar
            string="activate customer panel"
            onClick={() => setPanel("customerPanel")}
            onStatus={currentPanel === "customerPanel"}
          />

          <PanelActionBar
            string="activate maintainer panel"
            onClick={() => setPanel("maintainerPanel")}
            onStatus={currentPanel === "maintainerPanel"}
          />
          <PanelActionBar
            string="activate machinery simulator panel"
            onClick={() => setPanel("machinerySimulatorPanel")}
            onStatus={currentPanel === "machinerySimulatorPanel"}
          />
        </>
      )}

      {/* Panel */}
      <div>
        {currentPanel === "customerPanel" && isSimulationStarted && (
          <CustomerPanel />
        )}
        {currentPanel === "maintainerPanel" && isSimulationStarted && (
          <MaintainerControlPanel onClick={setEmptyPanel} />
        )}
        {currentPanel === "machinerySimulatorPanel" && isSimulationStarted && (
          <MachinerySimulationControlPanel />
        )}
      </div>
    </div>
  );
}

export default SimulatorPanel;
