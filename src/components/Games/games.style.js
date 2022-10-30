import { makeStyles } from '@mui/styles';
import { isMobile } from 'react-device-detect'

export const useGamesStyles = makeStyles({

   root: {
      width: props => (isMobile) ? `calc(${props.width}px)` : '100%',
      margin: 'auto',
      marginTop: '5vw',
      boxSizing: 'border-box',
   },
   cardContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
   },
   addGame: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `max-content`,
      margin: '40px',
      aspectRatio: 3/4,
      height: props => (isMobile) ? `calc(${props.width}px)` : `550px`,
      padding: '2vw',
      backgroundColor: '#45435f',
      position: 'relative',
      cursor: 'pointer',
      boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
      '&:hover': {
         '& .cover' :{
            position: 'absolute',
            aspectRatio: 3/4,
            width: 'inherit',
            height: props => (isMobile) ? `calc(${props.width}px)` : `550px`,
            background: 'rgba(255, 255, 255, 0.26)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
         }
         /* From https://css.glass */
      }
   },
   cardGame: {
      position: 'relative',
      margin: '40px',
      height: 'auto',
      width: 'min-content',
      cursor: 'pointer',
      backgroundColor: '#45435f',
      borderRadius: (!isMobile) && '2vw',
      boxSizing: 'border-box',
      boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
      '&:hover': {
         boxSizing: 'border-box',
         '& .bodyContent': {
            boxShadow: '0 0 10px #9ecaed',
            display: 'flex'
         }
      },
      '& .bodyContent': {
         top: 0,
         width: '100%',
         minHeight: '100%',
         height: 'auto',
         position: 'absolute',
         display: 'none',
         flexDirection: 'column',
         alignItems: 'flex-start',
         justifyContent: 'center',
         gap: '20px',
         padding: '10%',
         backgroundColor: 'rgba(69, 67, 95, 1)',
         borderRadius: '2vw',
         boxSizing: 'border-box',
         transition: 'display 0.3s'
      }
   },
   name: {
      textAlign: 'flex-start',
      fontSize: 'clamp(2vh, 4vh, 10vh)',
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'sans-serif'
   },
   description: {
      textAlign: 'flex-start',
      color: '#ffffff80',
      fontSize: 'clamp(2vh, 3vh, 10vh)'
   },
   price: {
      textAlign: 'flex-start',
      fontSize: 'clamp(2vh, 2.2vh, 10vh)',
      color: 'black',
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      padding: '1vh',
      borderRadius: '10px',
      backgroundColor: 'white'
   },
   picture: {
      width: `max-content`,
      aspectRatio: 3/4,
      maxHeight: props => (isMobile) ? `calc(${props.width}px)` : `550px`,
      padding: '2vw'
   },
   genreContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 'inherit',
      gap: '10px'
   },
   genre: {
      width: 'max-content',
      gridRow: '1',
      backgroundColor: '#ffffff50',
      padding: '1vh',
      color: 'white',
      fontSize: 'clamp(1.5vh, 2vh, 10vh)',
      borderRadius: '20px'
   }
})