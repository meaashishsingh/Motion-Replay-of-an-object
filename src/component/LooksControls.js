import React from 'react';

const LooksControls = ({
  size,
  setSize,
  color,
  setColor,
  word,
  setWord,
  word1,
  setWord1,
  sayDuration,
  setSayDuration,
  sayWord,
  visible,
  hideObject,
  showObject,
}) => {
  return (
    <div>
      <h2>Looks Controls</h2>
      <div>
        <button onClick={() => setSize(size)}>Set size to {size}</button>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div>
        <label>Color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <label>Say:</label>
        <input
          type="text"
          value={word1}
          onChange={(e) => setWord1(e.target.value)}
        />
        <label>for</label>
        <input
          type="number"
          value={sayDuration}
          onChange={(e) => setSayDuration(e.target.value)}
        />
        <label>seconds</label>
        <button onClick={() => sayWord(word1, sayDuration)}>Say</button>
      </div>
      <div>
        {visible ? (
          <button onClick={hideObject}>Hide</button>
        ) : (
          <button onClick={showObject}>Show</button>
        )}
      </div>
    </div>
  );
};

export default LooksControls;
