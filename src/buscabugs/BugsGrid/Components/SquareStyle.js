export const squareStyle = theme => {
  return ({
    btn: {
      width: '2em',
      height: '2em',
      borderColor: '#6d6d6d61',
      borderRadius: '8px',
      borderWidth: 'thin',
      color: 'black',
      fontFamily: "'Rokkitt', cursive",
      fontSize: '2em',
      fontWeight: 'bolder',
      transition: 'color 0.5s linear',
      '&:disabled  ': {
        backgroundColor: '#d7d7d7',
        border: 'none'
      },
    }
  })
};