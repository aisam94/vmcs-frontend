function PanelActionBar({string}) {
  return (
    <div className="panelbar p-1 bg-primary items-center">
      <span className="m-1 capitalize">{string}</span>
      <button className="ml-auto">Press</button>
    </div>
  );
}

export default PanelActionBar;
