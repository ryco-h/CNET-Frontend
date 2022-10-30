import { Avatar, Backdrop, CircularProgress } from "@mui/material"
import { style } from "@mui/system"
import { Fragment, useEffect, useState } from "react"
import { fetchSteamDB } from "../../services/fetchAPI"
import useWindowDimensions from "../../services/useWindowDimensions"
import Template from "../Template/template"
import { useMainpageStyles } from "./mainpage.style"
import empty from '../../images/404.png'
import { isMobile } from "react-device-detect"

export default function MainpageIndex() {
   return(
      <Template bodyContent={<Mainpage/>}/>
   )
}

function Mainpage() {

   const {width, height} = useWindowDimensions()
   const styles = useMainpageStyles({width, height})

   const [steamdb, setSteamDB] = useState()
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      fetchSteamDB()
      .then(res => {
         setSteamDB(res)
         setLoading(false)
      })
   }, [])

   console.log((steamdb) && steamdb)

   return(
      <div className={styles.root}>
         <div className={styles.cardContainer}>
            {(steamdb) && steamdb.map(collection => (
               <div className={styles.collectionContainer}>
                  <div key={collection.idSteamDB} className={styles.cardColletion}>
                     {[0, 1, 2, 3].map(idx => (
                        <Fragment>
                        {(collection.game[idx]) ?
                           <div key={collection.game[idx].idGame}>
                              <img 
                              onError={(currentTarget) => {
                                 currentTarget.target.onerror = null; // prevents looping
                                 currentTarget.target.src=empty
                               }}
                              src={collection.game[idx].picture} className={styles.picture}/>
                           </div>
                        :
                           <div>
                              <img src='https://w0.peakpx.com/wallpaper/228/508/HD-wallpaper-coming-soon-baseball.jpg' className={styles.pictureEmpty}/>
                           </div>
                        }
                        </Fragment>
                     ))}
                  </div>

                  <div style={{
                     display: 'flex',
                     boxSizing: 'border-box',
                     justifyContent: (isMobile) ? 'center' : 'flex-start',
                     alignItems: 'center',
                     marginTop: (!isMobile) && '1vw',
                     margin: '2vw',
                     marginBottom: '20px',
                     gap: '10px'
                  }}>
                     <Avatar sx={{ width: (isMobile) ? 30 : 56, height: (isMobile) ? 30 : 56 }} alt="Profile Picture" src="https://www.w3schools.com/w3images/avatar2.png" />
                     <span className={styles.publisher}>{collection.publisher.name}</span>
                  </div>
               </div>
            ))}
         </div>
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            >
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <CircularProgress color="inherit" />
            </div>
         </Backdrop>
      </div>
   )
}