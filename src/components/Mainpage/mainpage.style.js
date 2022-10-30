import { isMobile } from "react-device-detect";
const { makeStyles } = require("@mui/styles");

export const useMainpageStyles = makeStyles({
   root: {

   },
   cardContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
   },
   collectionContainer: {
      backgroundColor: '#45435f',
      margin: '2vw',
      height: 'auto',
      width: 'auto',
      cursor: 'pointer',
      borderRadius: (!isMobile) && '2vw',
      boxSizing: 'border-box',
      boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
   },
   cardColletion: {
      position: 'relative',
      display: 'flex',
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      margin: '40px',
   },
   publisher: {
      fontFamily: 'Homenaje',
      fontWeight: 'bold',
      letterSpacing: '1px',
      color: 'white',
      boxSizing: 'border-box',
      fontSize: 'clamp(2vh, 4vh, 10vh)'
   },
   picture: {
      width: `max-content`,
      aspectRatio: 3/4,
      maxHeight: props => (isMobile) ? `calc(${props.width}px)` : `250px`,
      padding: '1vw',
   },
   pictureEmpty: {
      width: `max-content`,
      aspectRatio: 3/4,
      height: props => (isMobile) ? `calc(${props.width}px)` : `250px`,
      padding: '1vw',
      objectFit: 'cover',
      borderRadius: '20px'
   }
})