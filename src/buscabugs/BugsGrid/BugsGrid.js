import React, { useContext } from 'react';
import { SquaresList } from './Components/SquareList';
import { BugsContext } from '../Context/BugsContext';

const bugsContainer = bugs => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${bugs[0].length},minmax(1em,1fr))`,
    gap: '0.1em',
    padding: '0.8em',
    borderRadius: '10px'
  }
};

export const BugsGrid = props => {

  const { bugs } = useContext(BugsContext);

  return <div style={bugsContainer(bugs)}>
    {bugs.map((rowOfSquares, row) => <SquaresList key={row} rowOfSquares={rowOfSquares} row={row} {...props} />)}
  </div>
}