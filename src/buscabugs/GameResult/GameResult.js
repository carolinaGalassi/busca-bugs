import React from 'react';
import { makeStyles } from '@material-ui/core';
import { gameResultStyle } from './GameResultStyle'
import { PLAYING } from '../utils';

const useStyles = makeStyles((theme) => gameResultStyle(theme));

const texts = {
  'win': '¡Ganaste!',
  'gameOver': '¡Perdiste!'
}
export const GameResult = ({ gameState }) => {
  const classes = useStyles();
  return <h2 className={classes.text}
    style={{ opacity: gameState !== PLAYING ? '1' : '0' }}>{texts[gameState]}</h2>
}