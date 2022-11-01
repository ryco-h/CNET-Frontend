import Template from "../Template/template"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, CircularProgress, Typography } from "@mui/material";
import useWindowDimensions from "../../services/useWindowDimensions";
import { usePublisherStyles } from "./publisher.style";
import { Fragment, useEffect, useState } from "react";
import { fetchPublisher, fetchSteamDB } from "../../services/fetchAPI";
import converDateFormat from "../../services/converDateFormat";
import { styled } from "@mui/styles";
import { isMobile } from "react-device-detect";
import formatHarga from "../../services/formatHarga";
import { useGamesStyles } from "../Games/games.style";
import empty from '../../images/404.png'
import { Link } from "react-router-dom";

export default function PublisherIndex() {

   return(
      <Template bodyContent={<Publisher/>}/>
   )
}

function Publisher() {

   const {width, height} = useWindowDimensions()
   const styles = usePublisherStyles({width, height})
   const stylesCardGame = useGamesStyles({width, height})
   const [isLoading, setLoading] = useState(true)

   const [publishers, setPublishers] = useState()
   const [steamdb, setSteamdb] = useState()
   
   useEffect(() => {

      fetchSteamDB()
      .then(result => {
         setSteamdb(result)
      })

      fetchPublisher()
      .then(result => {
         setPublishers(result)
         setLoading(false)
      })
   }, [])

   return(
      <div className={styles.root}>
         <div className={styles.container}>
            {(publishers && steamdb) && publishers.map((publisher, index, array) => (
               <Accordion key={publisher.idPublisher} sx={{backgroundColor: '#45435F'}}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon sx={{color: 'white'}}/>}
                     aria-controls="panel1bh-content"
                     id="panel1bh-header"
                  >
                     <Typography sx={{ width: '100%', flexShrink: 0, color: 'white'}}>
                        {publisher.name}
                     </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <div style={{width: '100%', height: '50%', position: 'relative'}}>
                        <div style={{width: '100%', height: '100%', position: 'absolute', background: 'linear-gradient(to bottom, transparent, transparent, #45435F)'}}>
                           <div style={{
                              display: 'flex',
                              width: '100%',
                              justifyContent: 'space-between',
                              bottom: 0,
                              position: 'absolute',
                              boxSizing: 'border-box',
                              padding: (isMobile) ? '2vw' : '6vw'
                           }}>        
                              <Typography sx={{ color: 'white', fontFamily: 'Homenaje', letterSpacing: '1.2px', fontSize: (isMobile) ? 'clamp(1vw, 4.5vw, 7vw)' : 'clamp(1vw, 2vw, 7vw)'}}>
                                 {publisher.company}
                              </Typography>

                              <Typography sx={{ color: 'white', fontFamily: 'Homenaje', letterSpacing: '1.2px', fontSize: (isMobile) ? 'clamp(1vw, 4.5vw, 7vw)' : 'clamp(1vw, 2vw, 7vw)'}}>
                                 Joined since: {converDateFormat(publisher.createdAt)}
                              </Typography>
                           </div>
                        </div>
                        <img src={'https://images.alphacoders.com/988/988021.jpg'} style={{width: '100%'}}/>
                     </div>

                     <div className={stylesCardGame.cardContainer}>
                        {steamdb.filter(collection => collection.publisher.idPublisher === publisher.idPublisher).map(collection => (
                           <Fragment key={collection.publisher.idPublisher}>
                           {collection.game.map((game, indexs, array) => (
                              <Link
                              to={`/games?name=${game.name}`}
                              key={game.id} className={stylesCardGame.cardGame} style={{zIndex: '99'-indexs}}>
                                 <img
                                 onError={(currentTarget) => {
                                    currentTarget.target.onerror = null; // prevents looping
                                    currentTarget.target.src=empty
                                 }}
                                 style={{width: '200px'}}
                                 className={stylesCardGame.picture} src={game.picture}/>
                              </Link>
                           ))}
                           </Fragment>
                        ))}
                     </div>
                  </AccordionDetails>
               </Accordion>
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