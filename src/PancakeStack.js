import React from 'react';
import Pancake from './Pancake';

import './PancakeStack.css';

function PancakeStack(props) {
  return (
    <div className="pancake-stack">
      {props.pancakes.map((pancake, i) =>
        (<Pancake
          key={i}
          size={getPancakeSize(pancake)}
          isBurnt={isPancakeBurnt(pancake)}
          onClick={() => props.onClick(i)}
        />)
      )}
    </div>
  );
}

function isPancakeBurnt(pancake) {
  return pancake < 0;
}

function getPancakeSize(pancake) {
  return Math.abs(pancake);
}

export default PancakeStack;
