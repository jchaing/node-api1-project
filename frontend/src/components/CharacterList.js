import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Character from './Character';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res.data);
        setCharacters(res.data);
      })
      .catch(err => console.log(err));
  }, [setCharacters]);

  const deleteChar = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log('Character delete', id, res);
        const fliterDeletedChar = characters.filter(
          character => character.id !== id
        );
        setCharacters([...fliterDeletedChar]);
      })
      .catch(err => console.log(err));
  };

  console.log(characters);

  return (
    <div>
      <h2>Character List</h2>
      {characters.map(character => (
        <Character
          key={character.id}
          character={character}
          delete={deleteChar}
        />
      ))}
    </div>
  );
};

export default CharacterList;
