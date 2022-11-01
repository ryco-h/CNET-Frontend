import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";

export const usePublisherStyles = makeStyles({

   root: {
      display: 'flex',
      boxSizing: 'border-box',
      justifyContent: 'center'
   },
   container: {
      width: props => (isMobile) ? `calc(${props.width}px * 0.9)` : `calc(${props.width}px * 0.8)`,
      padding: (!isMobile) && '5vw',
      paddingTop: (isMobile) && '5vw',
      paddingBottom: (isMobile) && '5vw',
      boxSizing: 'border-box',
   }
})