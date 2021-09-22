export const headerContainerStyle = theme => {
  return ({
    container: {
      display: 'flex',
      columnGap: '2em',
      '& > h1': {
        fontFamily: " 'Viga', sans-serif",
        '& span': {
          fontStyle: 'italic',
          color: '#3bc9ff'
        }
      },
      '& > button': {
        background: 'none',
        border: 'none',
        height: 'fit-content',
        alignSelf: 'center',
        cursor: 'pointer',
        marginTop: '5px',
        '& > svg': {
          fontSize: '1.5em',
          fontWeight: 'bold',
          transition: 'color 1s linear,transform 1s linear',
          '&:hover': {
            color: 'grey',
            transform: 'rotate(360deg)'
          }
        }
      }
    },
    bugsContainer: {
      display: 'flex',
      alignItems: 'center',
      '& > h3:first-child': {
        fontSize: '0.8em',
        fontWeight: 300
      }
    }
  })
};