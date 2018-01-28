import React, { Component } from 'react';
import PancakeStack from './PancakeStack';
import Settings from './Settings';
import Modal from './Modal';

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
      settings: Object.assign({}, DEFAULT_SETTINGS),
      history: [{
        pancakes: generatePancakeStack(DEFAULT_SETTINGS.pancakesInStack, DEFAULT_SETTINGS.pancakesAreBurnt, DEFAULT_SETTINGS.pancakesAreUniqueSizes)
      }]
    };
  }

  openSettings() {
    this.setState({showSettings: true});
  }

  closeSettings() {
    this.setState({showSettings: false});
  }

  saveSettings(settings) {
    this.setState({
      flips: 0,
      settings: settings,
      history: [{
        pancakes: generatePancakeStack(settings.pancakesInStack, settings.pancakesAreBurnt, settings.pancakesAreUniqueSizes)
      }],
      showSettings: false
    });
  }

  flipPancake(i) {
    // flip pancake up to i in the stack
    // EXAMPLE:
    //   pancakes [3,2,5,1,4]
    //   flipPancake(3)
    //   pancakes [5,2,3,1,4]
    // if pancakesAreBurnt is true, we will also flip the sign
    const history = this.state.history;
    const current = history[this.state.flips];
    const currentPancakeStack = current.pancakes;

    if (isStackCorrect(currentPancakeStack)) {
      return;
    }
    let flippingStack = currentPancakeStack.slice(0, i + 1);
    const restOfStack = currentPancakeStack.slice(i + 1);
    flippingStack.reverse();
    if (this.state.settings.pancakesAreBurnt) {
      flippingStack = flippingStack.map(value => -value);
    }
    this.setState({
      flips: this.state.flips + 1,
      history: [...history, {
        pancakes: flippingStack.concat(restOfStack)
      }]
    });
  }

  undoLastFlip() {
    if (!this.state.flips) {
      return;
    }
    this.setState({
      flips: this.state.flips - 1,
      history: this.state.history.slice(0, -1)
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.flips];
    const currentPancakeStack = current.pancakes;
    const stackIsCorrect = isStackCorrect(currentPancakeStack);
    return (
      <div>
        <PancakeStack pancakes={currentPancakeStack} onClick={(i) => this.flipPancake(i)} />
        <div>
          Number of flips: {this.state.flips}
          <button onClick={() => this.undoLastFlip()} disabled={!this.state.flips}> Undo</button>
        </div>
        <div> {stackIsCorrect ? 'Ready to serve!' : ''}</div>
        <button onClick={() => this.openSettings()}>New Game</button>
        {this.state.showSettings &&
          <Modal onCloseModal={() => this.closeSettings()}>
            <Settings
              currentSettings={this.state.settings}
              onSave={(i) => this.saveSettings(i)}
              onCancel={() => this.closeSettings()}
            />
          </Modal>
        }
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
