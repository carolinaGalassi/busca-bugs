import React, { useContext } from 'react';
import { BugsContext } from '../../Context/BugsContext';
import { Flag, BugReport, Help } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { squareStyle } from './SquareStyle';
import { GAME_OVER, WIN, removeUndefineds } from '../../utils';

const useStyles = makeStyles((theme) => squareStyle(theme));

export const Square = props => {

  const { amountOfBugs, updateSquare, bugs, updateBugs, getSquare } = useContext(BugsContext);
  const { gameState, setGameState, row, column } = props;
  const classes = useStyles();

  const square = getSquare(row, column);
  const gameIsOver = gameState === GAME_OVER;
  const isBug = square.isBug;
  const bugId = square.id;
  const isNotADoubtNorFlag = !square.isFlag && !square.isDuda;
  const finishGameOrIsDrawed = gameIsOver || (square.isDraw && isNotADoubtNorFlag);
  const findBug = square.isDraw && isBug && isNotADoubtNorFlag;
  const maybeIsBugOrFlagOrDoubt = square.isFlag || square.isBug || square.isDuda;
  const backgroundSquare = findBug ? '#ff0000a1' : '#EFEFEF';

  const styleOnlyForSvgs = maybeIsBugOrFlagOrDoubt ? {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } : {};

  const rightClickOption = () => {
    if (square.isFlag) return { isFlag: false, isDuda: true };
    if (square.isDuda) return { isDuda: false, isDraw: false };
    if (square.isBug && amountOfBugs() === 1) setGameState(WIN)
    return { isFlag: true, isDraw: true }
  }

  const draw = () => {
    if (square.isFlag) return <Flag />;
    if (square.isDuda) return <Help />;
    if (square.isBug) return <BugReport />;
    if (!square.value) return '';
    return square.value;
  }

  const drawSquare = () => {
    if (gameState === GAME_OVER || square.isDraw) return draw();
    return '';
  }

  const getRows = (fila, columna, value) => {
    const isNotInLimits = fila + value < bugs.length;

    if (isNotInLimits) {
      const previous = { ...getSquare(fila + value, columna - 1) }
      const current = { ...getSquare(fila + value, columna) };
      const next = { ...getSquare(fila + value, columna + 1) }

      return removeUndefineds([previous, current, next])
    } return [];

  }

  const getAdjacents = (row, column) => {
    return row === 0 ? [getRows(row, column, 0), getRows(row, column, 1)] :
      [getRows(row, column, -1), getRows(row, column, 0), getRows(row, column, 1)]
  }

  const drawAllAdjacents = (adjacents) => {
    let posAdjacents = -1
    updateBugs(bugs.map((rowOfSquares, numberRow) => {
      const isTheCurrentRowOrPreviousOrNext = numberRow === row || numberRow === row + 1 || numberRow === row - 1;

      if (isTheCurrentRowOrPreviousOrNext) {
        posAdjacents = posAdjacents + 1;
        return rowOfSquares.map(aSquare => {
          const isNotBugButIsAdyacente = !aSquare.isBug && adjacents[posAdjacents].find(adjacent => adjacent.id === aSquare.id);
          return isNotBugButIsAdyacente ? { ...aSquare, isDraw: true } : aSquare
        })
      }
      return rowOfSquares;
    }))

  }

  const processSquare = () => {
    if (isNotADoubtNorFlag) {
      if (isBug) {
        updateSquare({ isDraw: true }, row, bugId); setGameState(GAME_OVER); return;
      }
      drawAllAdjacents(getAdjacents(row, column));
    }
  }

  const searchingBug = event => {
    event.preventDefault();
    if (!finishGameOrIsDrawed) {
      updateSquare(rightClickOption(), row, bugId)
    }
  }

  return <button disabled={finishGameOrIsDrawed}
    onClick={processSquare}
    onContextMenu={searchingBug}
    className={classes.btn}
    style={{ backgroundColor: backgroundSquare, ...styleOnlyForSvgs }}>{drawSquare()}</button>
}