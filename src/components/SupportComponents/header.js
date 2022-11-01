import { makeStyles } from "@mui/styles"
import { isMobile } from "react-device-detect"
import useWindowDimensions from "../../services/useWindowDimensions"
import './header.css'

export default function Header() {

   const {width, height} = useWindowDimensions()
   const styles = useHeaderStyles({width, height})

   return(
      <div className={styles.root}>
         <div className={styles.leftSide}>
            <a href='/' className={styles.title + ' neonText'}>Steam DB</a>
         </div>

         <div className={styles.rightSide}>
            <a href='/games' className={styles.legend}>Games</a>
            <a href='/publishers' className={styles.legend}>Publishers</a>
         </div>
      </div>
   )
}

const useHeaderStyles = makeStyles({
   root: {
      display: 'flex',
      gap: (isMobile) ? '4vw' : '2vw',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      minHeight: '70px',
      position: 'relative',
      zIndex: '6',
      backgroundColor: '#45435f',
      borderRadius: '0px 0px 20px 20px',
      width: props => (isMobile) ? `calc(${props.width}px)` : `calc(${props.width}px * 0.6)`,
      height: `100%`,
      padding: '20px',
      paddingLeft: '50px',
      paddingRight: '50px',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
   },
   container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   leftSide: {
      display: 'flex',
      justifyContent: props => (isMobile) ? 'center' : (props.width < 768) ? 'center' : 'flex-start',
      flex: 1,
      // backgroundColor: 'red'
   },
   title: {
      fontSize: 'clamp(5vh, 7vh, 10vh)',
      color: 'white'
   },
   rightSide: {
      display: 'flex',
      justifyContent: props => (isMobile) ? 'center' : (props.width < 768) ? 'center' : 'flex-end',
      alignItems: 'center',
      flex: 1,
      // backgroundColor: 'blue'
   },
   legend: {
      fontSize: 'clamp(2vh, 3vh, 10vh)',
      color: 'white',
      paddingLeft: '20px',
      paddingRight: '20px',
      textDecoration: 'none',
      textTransform: 'uppercase',
      fontFamily: 'sans-serif'
   }
})