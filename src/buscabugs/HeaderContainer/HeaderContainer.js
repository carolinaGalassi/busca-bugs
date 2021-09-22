import React, { useContext } from 'react';
import { Repeat } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { headerContainerStyle } from './HeaderContainerStyle';
import { BugsContext } from '../Context/BugsContext';
import { PLAYING } from '../utils';

const useStyles = makeStyles((theme) => headerContainerStyle(theme));

export const HeaderContainer = ({ setGameState }) => {
  const classes = useStyles();
  const { amountOfBugs, reStartGame } = useContext(BugsContext);

  const reStart = () => {
    reStartGame(); setGameState(PLAYING);
  }
  return <header className={classes.container}>
    <h1 >Busca<span>bugs</span></h1>
    <div className={classes.bugsContainer}>
      <h3>Bugs</h3>
      <h3>{amountOfBugs()}</h3>
    </div>
    <button onClick={reStart} >
      <Repeat />
    </button>
  </header>
}