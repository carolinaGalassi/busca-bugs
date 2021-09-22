import React from 'react';
import { Square } from './Square';

export const SquaresList = ({ rowOfSquares, ...restOfprops }) => {

  return rowOfSquares.map((square, column) => {
    return <Square key={square.id} column={column} {...restOfprops} />
  })
}
