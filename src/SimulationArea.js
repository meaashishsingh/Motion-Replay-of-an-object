import React from 'react';
import catlogo from '../src/user.png';

const SimulationArea = ({ position, size, angle, visible, word, color }) => {
  return (
    <div className="simulation-area">
      {visible && (
        <img
          src={catlogo}
          alt="cat"
          className="object"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `rotate(${angle}deg)`,
            transition: 'transform 0.5s ease, left 0.5s ease, top 0.5s ease',
          }}
        />
      )}
      {word && (
        <div
          style={{
            position: 'absolute',
            left: `${position.x + size / 2}px`,
            top: `${position.y + size + 20}px`,
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'auto',
            height: 'auto',
            maxWidth: '200px',
            whiteSpace: 'nowrap',
          }}
        >
          {word}
        </div>
      )}
    </div>
  );
};

export default SimulationArea;
