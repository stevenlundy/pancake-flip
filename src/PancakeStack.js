import React from 'react';
import Pancake from './Pancake';

import {isPancakeBurnt, getPancakeSize} from './helpers';

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

export default PancakeStack;
