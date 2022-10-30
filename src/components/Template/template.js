import { makeStyles } from '@mui/styles'
import useWindowDimensions from '../../services/useWindowDimensions'
import Header from '../SupportComponents/header'

export default function Template({bodyContent}) {

   const {width, height} = useWindowDimensions()
   const styles = useTemplateStyles({width, height})

   console.log(width)

   return(
      <div className={styles.root}>
         <div className={styles.header}>
            <Header/>
         </div>
         <div className={styles.bodyContent}>
            {bodyContent}
         </div>
      </div>
   )
}

const useTemplateStyles = makeStyles({
   root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      backgroundColor: '#595871',
      boxSizing: 'border-box'
   },
   header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // width: props => `${props.width}px`,
      boxSizing: 'border-box'
   },
   bodyContent: {
      minHeight: '100vh',
   }
})