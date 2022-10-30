import Template from "../Template/template"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import useWindowDimensions from "../../services/useWindowDimensions";
import { usePublisherStyles } from "./publisher.style";
import { Fragment, useEffect, useState } from "react";
import { fetchPublisher, fetchSteamDB } from "../../services/fetchAPI";
import converDateFormat from "../../services/converDateFormat";

export default function PublisherIndex() {

   return(
      <Template bodyContent={<Publisher/>}/>
   )
}

function Publisher() {

   const {width, height} = useWindowDimensions()
   const styles = usePublisherStyles({width, height})
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

   console.log((steamdb) && steamdb.filter(collection => collection.publisher.idPublisher === 'pub-1').map(collection => collection.game))
   
   return(
      <div className={styles.root}>
         <div className={styles.container}>
            {(publishers && steamdb) && publishers.map(publisher => (
               <Accordion key={publisher.idPublisher}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="panel1bh-content"
                     id="panel1bh-header"
                  >
                     <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {publisher.name}
                     </Typography>
                     <Typography sx={{ color: 'text.secondary' }}>
                        {publisher.company}
                     </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     {steamdb.filter(collection => collection.publisher.idPublisher === publisher.idPublisher).map(collection => (
                        <Fragment>
                        {collection.game.map(game => (
                           <Fragment>
                              <tr>
                                 <td style={{padding: '15px', width: '30vw'}}>
                                    <Typography>
                                       {game.name}
                                    </Typography>
                                 </td>
                                 <td>
                                    <Typography>
                                       {converDateFormat(game.dateReleased)}
                                    </Typography>
                                 </td>
                              </tr>
                           </Fragment>
                        ))}
                        </Fragment>
                     ))}
                  </AccordionDetails>
               </Accordion>
            ))}
         </div>
      </div>
   )
}