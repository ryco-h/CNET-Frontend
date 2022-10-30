import { makeStyles } from "@mui/styles";

export const usePublisherStyles = makeStyles({

   root: {
      display: 'flex',
      boxSizing: 'border-box',
      justifyContent: 'center'
   },
   container: {
      width: props => `calc(${props.width}px * 0.8)`,
      padding: '10vw',
      boxSizing: 'border-box',
   }
})