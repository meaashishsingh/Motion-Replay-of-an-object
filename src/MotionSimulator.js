import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import catlogo from '../src/cat5.svg';

const MotionSimulator = () => {
  const [position, setPosition] = useState({ x: 453, y: 233 });
  const [angle, setAngle] = useState(0);
  const [size, setSize] = useState(100);
  const [steps, setSteps] = useState(10);
  const [turnDegrees, setTurnDegrees] = useState(15);
  const [turnDegrees1, setTurnDegrees1] = useState(15);
  const [goToX, setGoToX] = useState(120);
  const [goToY, setGoToY] = useState(100);
  const [goToX1, setGoToX1] = useState(50);
  const [goToY1, setGoToY1] = useState(50);
  const [glideSeconds, setGlideSeconds] = useState(1);
  const [pointDirection, setPointDirection] = useState(90);
  const [changeValue, setChangeValue] = useState(10);
  const [changeValue1, setChangeValue1] = useState(10);
  const [color, setColor] = useState('blue');
  const [word, setWord] = useState('Hello');
  const [sayDuration, setSayDuration] = useState(1);
  const [visible, setVisible] = useState(true);
  const [actionHistory, setActionHistory] = useState([]);
  const [initialState, setInitialState] = useState(null); // Store initial state
  const [selectedAction, setSelectedAction] = useState(null);

  const storeInitialState = () => {
    setInitialState({
      position: { ...position },
      angle: angle,
      size: size,
      color: color,
      word: word,
      visible: visible
    });
  };

  const minX = -23;
  const maxX = 1086;
  const minY = -7;
  const maxY = 608;

  const withinBounds = (x, y) => {
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  };

  const moveSteps = (steps) => {
    const rad = (Math.PI / 180) * angle;
    const newX = position.x + steps * Math.cos(rad);
    const newY = position.y + steps * Math.sin(rad);
    if (withinBounds(newX, newY)) {
      setPosition({ x: newX, y: newY });
      setActionHistory([...actionHistory, { action: 'move', params: { steps } }]);
    }
  };

  const handleMoveSteps = () => {
    const parsedSteps = Number(steps);
    if (!isNaN(parsedSteps)) {
      moveSteps(parsedSteps);
    }
  };

  const turnRight = (deg) => {
    setAngle((prev) => prev + deg);
    setActionHistory([...actionHistory, { action: 'turnRight', params: { deg } }]);
  };

  const turnLeft = (deg) => {
    setAngle((prev) => prev - deg);
    setActionHistory([...actionHistory, { action: 'turnLeft', params: { deg } }]);
  };

  const goToRandomPosition = () => {
    const randomX = Math.random() * (maxX - size);
    const randomY = Math.random() * (maxY - size);
    if (withinBounds(randomX, randomY)) {
      setPosition({ x: randomX, y: randomY });
      setActionHistory([...actionHistory, { action: 'goToRandomPosition' }]);
    }
  };

  const goToPosition = (x, y) => {
    const parsedX = Number(x);
    const parsedY = Number(y);
    if (!isNaN(parsedX) && !isNaN(parsedY) && withinBounds(parsedX, parsedY)) {
      setPosition({ x: parsedX, y: parsedY });
      setActionHistory([...actionHistory, { action: 'goToPosition', params: { x: parsedX, y: parsedY } }]);
    }
  };

  const handleGoToPosition = () => {
    goToPosition(goToX, goToY);
  };

  const glideToRandomPosition = (seconds) => {
    const randomX = Math.random() * (maxX - size);
    const randomY = Math.random() * (maxY - size);
    if (withinBounds(randomX, randomY)) {
      setTimeout(() => setPosition({ x: randomX, y: randomY }), seconds * 1000);
      setActionHistory([...actionHistory, { action: 'glideToRandomPosition', params: { seconds } }]);
    }
  };

  const glideToPosition = (x, y, seconds) => {
    const parsedX = Number(x);
    const parsedY = Number(y);
    if (!isNaN(parsedX) && !isNaN(parsedY) && withinBounds(parsedX, parsedY)) {
      setTimeout(() => setPosition({ x: parsedX, y: parsedY }), seconds * 1000);
      setActionHistory([...actionHistory, { action: 'glideToPosition', params: { x: parsedX, y: parsedY, seconds } }]);
    }
  };

  const changeX = (delta) => {
    const parsedDelta = Number(delta);
    const newX = position.x + parsedDelta;
    if (!isNaN(parsedDelta) && withinBounds(newX, position.y)) {
      const currentOne = parsedDelta + Number(goToX);
      setGoToX(currentOne);
      setPosition((prev) => ({ ...prev, x: newX }));
      setActionHistory([...actionHistory, { action: 'changeX', params: { delta: parsedDelta } }]);
    }
  };

  const setX = (x) => {
    const parsedX = Number(x);
    if (!isNaN(parsedX) && withinBounds(parsedX, position.y)) {
      setPosition((prev) => ({ ...prev, x: parsedX }));
      setActionHistory([...actionHistory, { action: 'setX', params: { x: parsedX } }]);
    }
  };

  const changeY = (delta) => {
    const parsedDelta = Number(delta);
    const newY = position.y + parsedDelta;
    if (!isNaN(parsedDelta) && withinBounds(position.x, newY)) {
      const currentOne = parsedDelta + Number(goToY);
      setGoToY(currentOne);
      setPosition((prev) => ({ ...prev, y: newY }));
      setActionHistory([...actionHistory, { action: 'changeY', params: { delta: parsedDelta } }]);
    }
  };

  const setY = (y) => {
    const parsedY = Number(y);
    if (!isNaN(parsedY) && withinBounds(position.x, parsedY)) {
      setPosition((prev) => ({ ...prev, y: parsedY }));
      setActionHistory([...actionHistory, { action: 'setY', params: { y: parsedY } }]);
    }
  };

  const pointInDirection = (direction) => {
    const parsedDirection = Number(direction);
    if (!isNaN(parsedDirection)) {
      setAngle(parsedDirection);
      setActionHistory([...actionHistory, { action: 'pointInDirection', params: { direction: parsedDirection } }]);
    }
  };

  const changeSize = (newSize) => {
    const parsedSize = Number(newSize);
    if (!isNaN(parsedSize)) {
      setSize(parsedSize);
      setActionHistory([...actionHistory, { action: 'changeSize', params: { newSize: parsedSize } }]);
    }
  };

  const changeColor = (color) => {
    setColor(color);
    setActionHistory([...actionHistory, { action: 'changeColor', params: { color } }]);
  };

  const sayWord = (word, duration) => {
    const parsedDuration = Number(duration);
    if (!isNaN(parsedDuration)) {
      setWord(word);
      setTimeout(() => setWord(''), parsedDuration * 1000);
      setActionHistory([...actionHistory, { action: 'sayWord', params: { word, duration: parsedDuration } }]);
    }
  };

  const hideObject = () => {
    setVisible(false);
    setActionHistory([...actionHistory, { action: 'hideObject' }]);
  };

  const showObject = () => {
    setVisible(true);
    setActionHistory([...actionHistory, { action: 'showObject' }]);
  };

 

  const replayActions = () => {
    actionHistory.forEach((item, index) => {
      setTimeout(() => {
        switch (item.action) {
          case 'move':
            moveSteps(item.params.steps);
            break;
          case 'turnRight':
            turnRight(item.params.deg);
            break;
          case 'turnLeft':
            turnLeft(item.params.deg);
            break;
          case 'goToRandomPosition':
            goToRandomPosition();
            break;
          case 'goToPosition':
            goToPosition(item.params.x, item.params.y);
            break;
          case 'glideToRandomPosition':
            glideToRandomPosition(item.params.seconds);
            break;
          case 'glideToPosition':
            glideToPosition(item.params.x, item.params.y, item.params.seconds);
            break;
          case 'changeX':
            changeX(item.params.delta);
            break;
          case 'setX':
            setX(item.params.x);
            break;
          case 'changeY':
            changeY(item.params.delta);
            break;
          case 'setY':
            setY(item.params.y);
            break;
          case 'pointInDirection':
            pointInDirection(item.params.direction);
            break;
          case 'changeSize':
            changeSize(item.params.newSize);
            break;
          case 'changeColor':
            changeColor(item.params.color);
            break;
          case 'sayWord':
            sayWord(item.params.word, item.params.duration);
            break;
          case 'hideObject':
            hideObject();
            break;
          case 'showObject':
            showObject();
            break;
          default:
            break;
        }
      }, index * 1000);
    });
  };
  const replaySelectedAction = (index) => {
    if (index >= 0 && index < actionHistory.length) {
      const action = actionHistory[index];
      switch (action.action) {
        case 'move':
          moveSteps(action.params.steps);
          break;
        case 'turnRight':
          turnRight(action.params.deg);
          break;
        case 'turnLeft':
          turnLeft(action.params.deg);
          break;
        case 'goToPosition':
          goToPosition(action.params.x, action.params.y);
          break;
        case 'glideToPosition':
          glideToPosition(action.params.x, action.params.y, action.params.seconds);
          break;
        case 'changeColor':
          changeColor(action.params.color);
          break;
        case 'sayWord':
          sayWord(action.params.word, action.params.duration);
          break;
        case 'hideObject':
          hideObject();
          break;
        case 'showObject':
          showObject();
          break;
        default:
          break;
      }
    }
  };

  const restoreInitialState = () => {
    if (initialState) {
      setPosition(initialState.position);
      setAngle(initialState.angle);
      setSize(initialState.size);
      setColor(initialState.color);
      setWord(initialState.word);
      setVisible(initialState.visible);
    }
  };

  const handleSelectAction = (e) => {
    const selectedIndex = Number(e.target.value);
    setSelectedAction(selectedIndex);
    if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < actionHistory.length) {
      storeInitialState();
      replaySelectedAction(selectedIndex);
      setTimeout(() => {
        restoreInitialState();
      }, (selectedIndex + 1) * 1000); // Adjust the delay as needed
    }
  };


  return (
    <div className="app">
      <div className="sidebar">
        <div className="controls">
        <h3>Motion</h3>
          <label>
            Steps:
            <input
              type="text"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
          </label>
          <button onClick={handleMoveSteps}>Move {steps} Steps</button>
          <label>
            Turn Right:
            <input
              type="text"
              value={turnDegrees}
              onChange={(e) => setTurnDegrees(e.target.value)}
            />
          </label>
          <button onClick={() => turnRight(Number(turnDegrees))}>Turn Right {turnDegrees}°</button>
          <label>
            Turn Left:
            <input
              type="text"
              value={turnDegrees1}
              onChange={(e) => setTurnDegrees1(e.target.value)}
            />
          </label>
          <button onClick={() => turnLeft(Number(turnDegrees1))}>Turn Left {turnDegrees1}°</button>
          <button onClick={goToRandomPosition}>Go to Random Position</button>
          <label>
            Go To X:
            <input
              type="text"
              value={goToX}
              onChange={(e) => setGoToX(e.target.value)}
            />
          </label>
          <label>
            Go To Y:
            <input
              type="text"
              value={goToY}
              onChange={(e) => setGoToY(e.target.value)}
            />
          </label>
          <button onClick={handleGoToPosition}>
            Go to ({goToX}, {goToY})
          </button>
          <label>
            Glide Seconds:
            <input
              type="text"
              value={glideSeconds}
              onChange={(e) => setGlideSeconds(e.target.value)}
            />
          </label>
          <button onClick={() => glideToRandomPosition(Number(glideSeconds))}>Glide to Random Position in {glideSeconds}s</button>
          <label>
            Go To X1:
            <input
              type="text"
              value={goToX1}
              onChange={(e) => setGoToX1(e.target.value)}
            />
          </label>
          <label>
            Go To Y1:
            <input
              type="text"
              value={goToY1}
              onChange={(e) => setGoToY1(e.target.value)}
            />
          </label>
          <button onClick={() => glideToPosition(goToX1, goToY1, glideSeconds)}>Glide to ({goToX1}, {goToY1}) in {glideSeconds}s</button>
          <label>
            Point Direction:
            <input
              type="text"
              value={pointDirection}
              onChange={(e) => setPointDirection(e.target.value)}
            />
          </label>
          <button onClick={() => pointInDirection(pointDirection)}>Point in Direction {pointDirection}°</button>
          <label>
            Change Value by X:
            <input
              type="text"
              value={changeValue}
              onChange={(e) => setChangeValue(e.target.value)}
            />
          </label>
          <button onClick={() => changeX(changeValue)}>Change X by {changeValue}</button>
          <label>
            SetX:
            <input
              type="text"
              value={goToX}
              onChange={(e) => setGoToX(e.target.value)}
            />
          </label>
          <button onClick={() => setX(goToX)}>Set X to {goToX}</button>
          <label>
            Change Value by Y:
            <input
              type="text"
              value={changeValue1}
              onChange={(e) => setChangeValue1(e.target.value)}
            />
          </label>
          <button onClick={() => changeY(changeValue1)}>Change Y by {changeValue1}</button>
          <label>
            SetX:
            <input
              type="text"
              value={goToY}
              onChange={(e) => setGoToY(e.target.value)}
            />
          </label>
          <button onClick={() => setY(goToY)}>Set Y to {goToY}</button>
          <h3>Looks</h3>
          <label>
            Size:
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </label>
          <button onClick={() => changeSize(size)}>Set Size to {size}px</button>
          <label>
            Color:
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <button onClick={() => changeColor(color)}>Change Color to {color}</button>
          {/* <label>
            Say Word:
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </label>
          <label>
            Say Duration (seconds):
            <input
              type="text"
              value={sayDuration}
              onChange={(e) => setSayDuration(e.target.value)}
            />
          </label> */}
          <button onClick={() => sayWord(word, sayDuration)}>Say  <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            /> for  <input
            type="text"
            value={sayDuration}
            onChange={(e) => setSayDuration(e.target.value)}
          /> s</button>
          <button onClick={hideObject}>Hide</button>
          <button onClick={showObject}>Show</button>
          <h3>Control</h3>
          <select
          onChange={handleSelectAction}
          value={selectedAction}
        >
          <option value={null}>Select Action</option>
          {actionHistory.map((action, index) => (
            <option key={index} value={index}>
              {action.action}
            </option>
          ))}
        </select>
        
          <button onClick={replaySelectedAction}>Replay Actions</button>
          {/* <button onClick={replayActions}>Replay Actions</button> */}
        </div>
      </div>
      <div className="simulation-area">
        <div
          className="object"
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            transform: `rotate(${angle}deg)`,
            width: size,
            height: size,
            display: visible ? 'block' : 'none'
          }}
        >
          <img src={catlogo} alt="Object" />
          {word && (
            <div style={{ top: position.y - 20 }}>
              {word}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotionSimulator;
