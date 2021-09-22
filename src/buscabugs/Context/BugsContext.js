import React, { useState, createContext, } from 'react';
import { dataOfBugs } from '../Data';

export const BugsContext = createContext();

export const BugsContextProvider = ({ children }) => {

  const [bugs, setBugs] = useState(dataOfBugs);

  const updateBugs = value => setBugs(value)

  const reStartGame = () => updateBugs(dataOfBugs);

  const amountOfBugs = () => {
    return bugs.flat().reduce((counterOfBugs, square) => {
      return counterOfBugs + (square.isBug && !square.isFlag ? 1 : 0);
    }, 0);
  }
  const getSquare = (aRow, aColumn) => bugs[aRow][aColumn];

  const updateSquare = (newValues, rowClicked, id) => {
    updateBugs(bugs.map((rowOfSquares, posRow) => {
      if (posRow === rowClicked) {
        return rowOfSquares.map(square => square.id === id ?
          { ...square, ...newValues } : square);
      }
      return rowOfSquares
    }))
  }

  return (
    <BugsContext.Provider value={{ bugs, reStartGame, amountOfBugs, updateSquare, updateBugs, getSquare }}>
      {children}
    </BugsContext.Provider>
  );
};
