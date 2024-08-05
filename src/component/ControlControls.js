import React from 'react';

const ControlControls = ({
  saveInitialState,
  loadInitialState,
  deleteInitialState,
  actionHistory,
  selectedAction,
  setSelectedAction,
  replaySelectedAction,
  selectIndex1,
  setselectIndex1,
}) => {
  return (
    <div>
      <h2>Control Controls</h2>
      <div>
        <button onClick={saveInitialState}>Save Initial State</button>
      </div>
      <div>
        <button onClick={loadInitialState}>Load Initial State</button>
      </div>
      <div>
        <button onClick={deleteInitialState}>Delete Initial State</button>
      </div>
      <div>
        <h3>Action History</h3>
        <ul>
          {actionHistory.map((action, index) => (
            <li key={index}>
              <button onClick={() => replaySelectedAction(index)}>
                Replay Action {index + 1}
              </button>
              {action.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ControlControls;
