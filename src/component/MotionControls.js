import React from 'react';

const MotionControls = ({
  steps,
  setSteps,
  turnDegrees,
  setTurnDegrees,
  turnDegrees1,
  setTurnDegrees1,
  goToX,
  setGoToX,
  goToY,
  setGoToY,
  goToX1,
  setGoToX1,
  goToY1,
  setGoToY1,
  glideSeconds,
  setGlideSeconds,
  pointDirection,
  setPointDirection,
  changeValue,
  setChangeValue,
  changeValue1,
  setChangeValue1,
  handleMoveSteps,
  turnRight,
  turnLeft,
  goToRandomPosition,
  handleGoToPosition,
  glideToRandomPosition,
  glideToPosition,
  changeX,
  setX,
  changeY,
  setY,
  pointInDirection,
}) => {
  return (
    <div>
      <h2>Motion Controls</h2>
      <div>
        <button onClick={handleMoveSteps}>Move {steps} steps</button>
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => turnRight(turnDegrees)}>Turn Right {turnDegrees} degrees</button>
        <input
          type="number"
          value={turnDegrees}
          onChange={(e) => setTurnDegrees(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => turnLeft(turnDegrees1)}>Turn Left {turnDegrees1} degrees</button>
        <input
          type="number"
          value={turnDegrees1}
          onChange={(e) => setTurnDegrees1(e.target.value)}
        />
      </div>
      <div>
        <button onClick={goToRandomPosition}>Go to random position</button>
      </div>
      <div>
        <button onClick={handleGoToPosition}>Go to position ({goToX}, {goToY})</button>
        <input
          type="number"
          value={goToX}
          onChange={(e) => setGoToX(e.target.value)}
        />
        <input
          type="number"
          value={goToY}
          onChange={(e) => setGoToY(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => glideToRandomPosition(glideSeconds)}>Glide to random position in {glideSeconds} seconds</button>
        <input
          type="number"
          value={glideSeconds}
          onChange={(e) => setGlideSeconds(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => glideToPosition(goToX1, goToY1, glideSeconds)}>Glide to position ({goToX1}, {goToY1}) in {glideSeconds} seconds</button>
        <input
          type="number"
          value={goToX1}
          onChange={(e) => setGoToX1(e.target.value)}
        />
        <input
          type="number"
          value={goToY1}
          onChange={(e) => setGoToY1(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => changeX(changeValue)}>Change X by {changeValue}</button>
        <input
          type="number"
          value={changeValue}
          onChange={(e) => setChangeValue(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => setX(goToX)}>Set X to {goToX}</button>
        <input
          type="number"
          value={goToX}
          onChange={(e) => setGoToX(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => changeY(changeValue1)}>Change Y by {changeValue1}</button>
        <input
          type="number"
          value={changeValue1}
          onChange={(e) => setChangeValue1(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => setY(goToY)}>Set Y to {goToY}</button>
        <input
          type="number"
          value={goToY}
          onChange={(e) => setGoToY(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => pointInDirection(pointDirection)}>Point in direction {pointDirection} degrees</button>
        <input
          type="number"
          value={pointDirection}
          onChange={(e) => setPointDirection(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MotionControls;
