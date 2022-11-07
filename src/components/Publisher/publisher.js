import Template from "../Template/template"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Backdrop, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, TextField, Typography, useMediaQuery } from "@mui/material";
import useWindowDimensions from "../../services/useWindowDimensions";
import { usePublisherStyles } from "./publisher.style";
import { forwardRef, Fragment, useEffect, useState } from "react";
import { fetchPublisher, fetchSteamDB, URL } from "../../services/fetchAPI";
import converDateFormat from "../../services/converDateFormat";
import { styled } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import { isMobile } from "react-device-detect";
import formatHarga from "../../services/formatHarga";
import { useGamesStyles } from "../Games/games.style";
import empty from '../../images/404.png'
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import axios from 'axios'

export default function PublisherIndex() {

   return(
      <Template bodyContent={<Publisher/>}/>
   )
}

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const validate = values => {

   const errors = {};
   if (!values.name) {
      errors.name = 'Tidak boleh kosong';
   } else if (values.name.length > 5) {
      errors.name = 'Must be 5 characters or less';
   }

   if(!values.company) {
      errors.company = 'Tidak boleh kosong'
   }

   if(!values.username) {
      errors.username = 'Tidak boleh kosong'
   }

   if(!values.password) {
      errors.password = 'Tidak boleh kosong'
   }

   return errors
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

   const formik = useFormik({
      initialValues: {
         name: '',
         company: '',
         username: '',
         password: ''
      },
      validate,
      onSubmit: async (values) => {
         setLoading(true)
         await axios.post(`${URL}/publisher/register-publisher`, values)
         .then(res => {
            window.alert(JSON.stringify(res))
            setLoading(false)
         })
         .catch(err => {
            window.alert(JSON.stringify(err))
            setLoading(false)
         })
      }
   })

   // Form Modal
   const [open, setOpen] = useState(false);
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return(
      <div className={styles.root}>
         <div className={styles.container}>
            <div style={{
               display: 'flex',
               justifyContent: 'center',
               boxSizing: 'border-box',
               marginBottom: '2vw'
            }}>
               <Button variant='contained' onClick={() => handleClickOpen()}>Register Publisher</Button>
            </div>
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

         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={true}
         >
            <DialogTitle>{"POST Publisher"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  <Alert variant={'standard'} severity={'info'} sx={{width: '100%', fontFamily: 'Homenaje', fontSize: '120%', letterSpacing: '1.2px', boxSizing: 'border-box', fontWeight: 'bold'}}>
                     /api/v1/publisher/register-publisher
                  </Alert>
               </DialogContentText>

               <form onSubmit={formik.handleSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box',
                  margin: '20px',
                  gap: '20px'
               }}>
                  <TextField
                     fullWidth
                     id="name"
                     name="name"
                     label="Nama"
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     error={formik.touched.name && Boolean(formik.errors.name)}
                     helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                     fullWidth
                     id="company"
                     name="company"
                     label="Company"
                     value={formik.values.company}
                     onChange={formik.handleChange}
                     error={formik.touched.company && Boolean(formik.errors.company)}
                     helperText={formik.touched.company && formik.errors.company}
                  />
                  <TextField
                     fullWidth
                     id="username"
                     name="username"
                     label="Username"
                     value={formik.values.username}
                     onChange={formik.handleChange}
                     error={formik.touched.username && Boolean(formik.errors.username)}
                     helperText={formik.touched.username && formik.errors.username}
                  />
                  <TextField
                     fullWidth
                     id="password"
                     name="password"
                     label="Password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     error={formik.touched.password && Boolean(formik.errors.password)}
                     helperText={formik.touched.password && formik.errors.password}
                  />
                  <Button color="primary" variant="contained" fullWidth type="submit">
                     POST
                  </Button>
               </form>
            </DialogContent>
         </Dialog>

         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999999991 }}
            open={isLoading}
            >
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <CircularProgress color="inherit" />
            </div>
         </Backdrop>
      </div>
   )
}