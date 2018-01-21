import React from 'react';
import './Pancake.css';

const MIN_PANCAKE_SIZE = 50;

function Pancake(props) {
  const style = {
    width: props.size * 10 + MIN_PANCAKE_SIZE
  };

  return (
    <div
      className={'pancake ' + (props.isBurnt ? 'is-burnt' : '')}
      style={style}
      onClick={props.onClick}
    />
  );
}

export default Pancake;
