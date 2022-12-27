import { useState } from "react";
import PanelActionBar from "./PanelActionBar";

function SimulatorPanel() {
  return (
    <div className="m-5">
      <h1 className="text-primary text-center">Simulator Control Panel</h1>
      <PanelActionBar string="begin simulation" />
      <PanelActionBar string="end simulation" />

      <PanelActionBar string="activate customer panel" />
      <PanelActionBar string="activate maintainer panel" />
      <PanelActionBar string="activate machinery simulator panel" />
    </div>
  );
}

export default SimulatorPanel;
