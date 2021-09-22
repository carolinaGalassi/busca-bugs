import React, { useState } from 'react';
import { HeaderContainer } from './HeaderContainer/HeaderContainer';
import { BugsGrid } from './BugsGrid/BugsGrid';
import { GameResult } from './GameResult/GameResult';
import { BugsContextProvider } from './Context/BugsContext';
import { makeStyles } from '@material-ui/core';
import { buscabugsStyle } from './BuscabugsStyle'
import { PLAYING } from './utils';

const useStyles = makeStyles((theme) => buscabugsStyle(theme));

export const BuscabugsContainer = () => {

  const [gameState, setGameState] = useState(PLAYING);
  const classes = useStyles();

  return <section className={classes.container}>
    <BugsContextProvider>
      <HeaderContainer setGameState={setGameState} />
      <BugsGrid setGameState={setGameState} gameState={gameState} />
      <GameResult gameState={gameState} />
    </BugsContextProvider>
  </section >


}