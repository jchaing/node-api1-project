import React from 'react';

const Character = props => {
  return (
    <div>
      <div>Name: {props.character.name}</div>
      <div>Bio: {props.character.bio}</div>
    </div>
  )
}

export default Character;
