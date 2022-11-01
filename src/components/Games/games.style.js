import { makeStyles } from '@mui/styles';
import { isMobile } from 'react-device-detect'

export const useGamesStyles = makeStyles({

   root: {
      width: props => (isMobile) ? `calc(${props.width}px)` : '100%',
      margin: 'auto',
      marginTop: '5vw',
      boxSizing: 'border-box',
   },
   search: {
      width: props => (isMobile) ? `calc(${props.width}px)` : '100%',
      display: 'flex',
      justifyContent: 'center',
   },
   input: {
      boxSizing: 'border-box',
      padding: '15px',
      borderRadius: '20px',
      backgroundColor: '#45435F',
      width: (isMobile) ? '300px' : '400px',
      maxWidth: props => `calc(${props.width}px * 0.8)`,
      height: 'auto',
      transition: 'width .5s',
      color: 'white',
      border: '0px',
      fontSize: (isMobile) ? 'clamp(1vw, 4.5vw, 7vw)' : 'clamp(1vw, 2vw, 7vw)',
      outline: 'none',
      '&::placeholder': {
         outline: 'none',
         fontSize: (isMobile) ? 'clamp(1vw, 4.5vw, 7vw)' : 'clamp(1vw, 2vw, 7vw)',
         color: '#ffffff80',
      },
      '&:focus': {
         border: '0px',
         width: '600px',
         outline: 'none'
      },
      '&::-webkit-search-cancel-button': {
         // backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=)',
         WebKitAppearance: 'none',
         appearance: 'none',
         height: '2vw',
         width: '2vw',
         background: 'url(https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png) no-repeat 50% 50%',
         backgroundSize: 'contain',
      },
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
      maxWidth: props => `calc(${props.width}px * 0.8)`,
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
            maxWidth: props => `calc(${props.width}px * 0.8)`,
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
      aspectRatio: 3/4,
      maxWidth: props => `calc(${props.width}px * 0.8)`,
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