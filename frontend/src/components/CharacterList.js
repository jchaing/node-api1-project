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

  console.log(characters);

  return (
    <div>
      <h2>Character List</h2>
      {characters.map(character => (
        <Character key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
