import React, { Component } from 'react';
import PancakeStack from './PancakeStack';

import './App.css';

const DEFAULT_SETTINGS = {
  pancakesInStack: 5,
  pancakesAreBurnt: false,
  pancakesAreUniqueSizes: true
};
Object.freeze(DEFAULT_SETTINGS);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pancakesInStack: DEFAULT_SETTINGS.pancakesInStack,
      pancakesAreBurnt: DEFAULT_SETTINGS.pancakesAreBurnt,
      pancakesAreUniqueSizes: DEFAULT_SETTINGS.pancakesAreUniqueSizes,
      pancakes: generatePancakeStack(DEFAULT_SETTINGS.pancakesInStack, DEFAULT_SETTINGS.pancakesAreBurnt, DEFAULT_SETTINGS.pancakesAreUniqueSizes)
    };
  }

  render() {
    return (
      <div>
        <PancakeStack pancakes={this.state.pancakes} />
      </div>
    );
  }
}

function generatePancakeStack(number, areBurnt, areUniqueSizes) {
  var pancakes = Array(number).fill(null);
  if (areUniqueSizes) {
    // fill the array with numbers from 1 to `number` and shuffle them
    pancakes = pancakes.map((value, i) => i + 1);
    shuffle(pancakes);
  } else {
    // fill the array with random numbers between 1 and `number`
    pancakes = pancakes.map(() => Math.ceil(Math.random() * number));
  }

  if (areBurnt) {
    // randomly set some of the pancakes to be burnt
    pancakes = pancakes.map(value => Math.round(Math.random()) ? value : -value)
  }

  return pancakes;
}

function shuffle(arr) {
  // shuffle an array in place
  for (let i = 1; i < arr.length; i++) {
    let swapPos = Math.floor(Math.random() * (i + 1));
    let tmp = arr[swapPos];
    arr[swapPos] = arr[i];
    arr[i] = tmp;
  }
  return arr;
}

export default App;
