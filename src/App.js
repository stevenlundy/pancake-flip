import React, { Component } from 'react';
import PancakeStack from './PancakeStack';

import {shuffle, isPancakeBurnt, getPancakeSize} from './helpers';

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
      flips: 0,
      pancakesInStack: DEFAULT_SETTINGS.pancakesInStack,
      pancakesAreBurnt: DEFAULT_SETTINGS.pancakesAreBurnt,
      pancakesAreUniqueSizes: DEFAULT_SETTINGS.pancakesAreUniqueSizes,
      pancakes: generatePancakeStack(DEFAULT_SETTINGS.pancakesInStack, DEFAULT_SETTINGS.pancakesAreBurnt, DEFAULT_SETTINGS.pancakesAreUniqueSizes)
    };
  }

  flipPancake(i) {
    // flip pancake up to i in the stack
    // EXAMPLE:
    //   pancakes [3,2,5,1,4]
    //   flipPancake(3)
    //   pancakes [5,2,3,1,4]
    // if pancakesAreBurnt is true, we will also flip the sign
    if (isStackCorrect(this.state.pancakes)) {
      return;
    }
    let flippingStack = this.state.pancakes.slice(0, i + 1);
    const restOfStack = this.state.pancakes.slice(i + 1);
    flippingStack.reverse();
    if (this.state.pancakesAreBurnt) {
      flippingStack = flippingStack.map(value => -value);
    }
    this.setState({
      flips: this.state.flips + 1,
      pancakes: flippingStack.concat(restOfStack)
    });
  }

  render() {
    const stackIsCorrect = isStackCorrect(this.state.pancakes);
    return (
      <div>
        <PancakeStack pancakes={this.state.pancakes} onClick={(i) => this.flipPancake(i)} />
        <div> Number of flips: {this.state.flips}</div>
        <div> {stackIsCorrect ? 'Ready to serve!' : ''}</div>
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

function isStackCorrect(pancakes) {
  if (pancakes.some(isPancakeBurnt)) {
    return false;
  }
  for (let i = 1; i < pancakes.length; i++) {
    if (getPancakeSize(pancakes[i]) < getPancakeSize(pancakes[i - 1])) {
      return false;
    }
  }
  return true;
}

export default App;
