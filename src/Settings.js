import React, { Component } from 'react';

import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pancakesInStack: props.currentSettings.pancakesInStack,
      pancakesAreBurnt: props.currentSettings.pancakesAreBurnt,
      pancakesAreUniqueSizes: props.currentSettings.pancakesAreUniqueSizes
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave(this.state);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value;

    if (target.type === 'checkbox') {
      value = target.checked;
    } else if (target.type === 'number') {
      value = +target.value;
    } else {
      value = target;
    }

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form className="settings" onSubmit={this.handleSubmit}>
        <fieldset>
          <label>
            Number of pancakes in a stack
            <input type="number" name="pancakesInStack" value={this.state.pancakesInStack} min="3" max="20" onChange={this.handleInputChange} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <input type="checkbox" name="pancakesAreBurnt" checked={this.state.pancakesAreBurnt} onChange={this.handleInputChange} />
            The chef is careless (i.e. the pancakes are burnt on the bottom)
          </label>
        </fieldset>
        <fieldset>
          <label>
            <input type="checkbox" name="pancakesAreUniqueSizes" checked={this.state.pancakesAreUniqueSizes} onChange={this.handleInputChange} />
            The pancakes are unique sizes
          </label>
        </fieldset>
        <input type="submit" value="Start new game" />
        <input type="button" value="Cancel" onClick={this.props.onCancel} />
      </form>
    );
  }
}

export default Settings;
