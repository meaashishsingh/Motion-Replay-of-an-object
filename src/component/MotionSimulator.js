import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SimulationArea from './SimulationArea';
import './MotionSimulator.css';

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
  const [word, setWord] = useState('');
  const [word1, setWord1] = useState('Hello');
  const [sayDuration, setSayDuration] = useState(1);
  const [visible, setVisible] = useState(true);
  const [actionHistory, setActionHistory] = useState([]);
  const [initialState, setInitialState] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectIndex1, setselectIndex1] = useState();

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
        case 'glideToRandomPosition':
          glideToRandomPosition(action.params.seconds);
          break;
        case 'changeX':
          changeX(action.params.delta);
          break;
        case 'changeY':
          changeY(action.params.delta);
          break;
        case 'setX':
          setX(action.params.x);
          break;
        case 'setY':
          setY(action.params.y);
          break;
        case 'pointInDirection':
          pointInDirection(action.params.direction);
          break;
        case 'changeSize':
          changeSize(action.params.newSize);
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

  const saveInitialState = () => {
    const initialState = {
      position,
      angle,
      size,
      steps,
      turnDegrees,
      turnDegrees1,
      goToX,
      goToY,
      goToX1,
      goToY1,
      glideSeconds,
      pointDirection,
      changeValue,
      changeValue1,
      color,
      word,
      word1,
      sayDuration,
      visible,
    };
    setInitialState(initialState);
  };

  const loadInitialState = () => {
    if (initialState) {
      setPosition(initialState.position);
      setAngle(initialState.angle);
      setSize(initialState.size);
      setSteps(initialState.steps);
      setTurnDegrees(initialState.turnDegrees);
      setTurnDegrees1(initialState.turnDegrees1);
      setGoToX(initialState.goToX);
      setGoToY(initialState.goToY);
      setGoToX1(initialState.goToX1);
      setGoToY1(initialState.goToY1);
      setGlideSeconds(initialState.glideSeconds);
      setPointDirection(initialState.pointDirection);
      setChangeValue(initialState.changeValue);
      setChangeValue1(initialState.changeValue1);
      setColor(initialState.color);
      setWord(initialState.word);
      setWord1(initialState.word1);
      setSayDuration(initialState.sayDuration);
      setVisible(initialState.visible);
    }
  };

  const deleteInitialState = () => {
    setInitialState(null);
  };

  return (
    <div className="motion-simulator">
      <Sidebar
        steps={steps}
        setSteps={setSteps}
        turnDegrees={turnDegrees}
        setTurnDegrees={setTurnDegrees}
        turnDegrees1={turnDegrees1}
        setTurnDegrees1={setTurnDegrees1}
        goToX={goToX}
        setGoToX={setGoToX}
        goToY={goToY}
        setGoToY={setGoToY}
        goToX1={goToX1}
        setGoToX1={setGoToX1}
        goToY1={goToY1}
        setGoToY1={setGoToY1}
        glideSeconds={glideSeconds}
        setGlideSeconds={setGlideSeconds}
        pointDirection={pointDirection}
        setPointDirection={setPointDirection}
        changeValue={changeValue}
        setChangeValue={setChangeValue}
        changeValue1={changeValue1}
        setChangeValue1={setChangeValue1}
        color={color}
        setColor={setColor}
        word={word}
        setWord={setWord}
        word1={word1}
        setWord1={setWord1}
        sayDuration={sayDuration}
        setSayDuration={setSayDuration}
        handleMoveSteps={handleMoveSteps}
        turnRight={turnRight}
        turnLeft={turnLeft}
        goToRandomPosition={goToRandomPosition}
        handleGoToPosition={handleGoToPosition}
        glideToRandomPosition={glideToRandomPosition}
        glideToPosition={glideToPosition}
        changeX={changeX}
        setX={setX}
        changeY={changeY}
        setY={setY}
        pointInDirection={pointInDirection}
        changeSize={changeSize}
        sayWord={sayWord}
        hideObject={hideObject}
        showObject={showObject}
        actionHistory={actionHistory}
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        saveInitialState={saveInitialState}
        loadInitialState={loadInitialState}
        deleteInitialState={deleteInitialState}
        replaySelectedAction={replaySelectedAction}
        setselectIndex1={setselectIndex1}
        selectIndex1={selectIndex1}
      />
      <SimulationArea
        position={position}
        angle={angle}
        size={size}
        visible={visible}
        word={word}
      />
    </div>
  );
};

export default MotionSimulator;
