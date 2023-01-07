function PanelActionBar({ string, onClick, onStatus }) {
  return (
    <div className="panelbar p-1 bg-primary items-center">
      <span className="m-1 capitalize">{string}</span>
      {/* <button className="ml-auto" onClick={onClick}>Press</button> */}
      {onStatus ? (
        <button className="ml-auto button-on" onClick={onClick}>
          Press
        </button>
      ) : (
        <button className="ml-auto" onClick={onClick}>
          Press
        </button>
      )}
    </div>
  );
}

export default PanelActionBar;
