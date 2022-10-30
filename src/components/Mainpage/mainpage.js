import { Avatar } from "@mui/material"
import { style } from "@mui/system"
import { Fragment, useEffect, useState } from "react"
import { fetchSteamDB } from "../../services/fetchAPI"
import useWindowDimensions from "../../services/useWindowDimensions"
import Template from "../Template/template"
import { useMainpageStyles } from "./mainpage.style"

export default function MainpageIndex() {
   return(
      <Template bodyContent={<Mainpage/>}/>
   )
}

function Mainpage() {

   const {width, height} = useWindowDimensions()
   const styles = useMainpageStyles({width, height})

   const [steamdb, setSteamDB] = useState()

   useEffect(() => {
      fetchSteamDB()
      .then(res => {
         setSteamDB(res)
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
                              <img src={collection.game[idx].picture} className={styles.picture}/>
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
                     justifyContent: 'flex-start',
                     alignItems: 'center',
                     marginTop: '1vw',
                     margin: '2vw',
                     gap: '10px'
                  }}>
                     <Avatar sx={{ width: 56, height: 56 }} alt="Profile Picture" src="https://www.w3schools.com/w3images/avatar2.png" />
                     <span className={styles.publisher}>{collection.publisher[0].name}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}