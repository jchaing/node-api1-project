import React from 'react';

const Character = props => {
  return (
    <div>
      <div>Name: {props.character.name}</div>
      <div>Bio: {props.character.bio}</div>
      <button>Edit</button>
      <button onClick={() => props.delete(props.character.id)}>Delete</button>
    </div>
  )
}

export default Character;
