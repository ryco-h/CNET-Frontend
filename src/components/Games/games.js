import { forwardRef, Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Template from "../Template/template";
import { useGamesStyles } from "./games.style";

import { fetchGame, URL } from "../../services/fetchAPI";
import formatHarga from "../../services/formatHarga";
import useWindowDimensions from "../../services/useWindowDimensions";

import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useFormik } from 'formik'
import { Alert, Autocomplete, Backdrop, Button, Chip, CircularProgress, Slide, TextareaAutosize, TextField } from "@mui/material";
import empty from '../../images/404.png'
import axios from "axios";

const validate = values => {

   const errors = {};
   if (!values.name) {
      errors.name = 'Tidak boleh kosong';
   } else if (values.name.length < 5) {
      errors.name = 'Must be more than 5 characters';
   }
   
   if (!values.description) {
      errors.description = 'Tidak boleh kosong';
   }

   if (!values.price) {
      errors.price = 'Tidak boleh kosong';
   } else if (values.price < 0 || isNaN(values.price)) {
      errors.price = 'Harga tidak valid';
   }

   if (!values.dateReleased) {
      errors.dateReleased = 'Tidak boleh kosong';
   }

   if (values.genre.length === 0) {
      errors.genre = 'Tidak boleh kosong';
   }

   if (!values.publisher) {
      errors.publisher = 'Tidak boleh kosong';
   }

   return errors;
};

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export default function GamesIndex() {

   return(
      <Template bodyContent={<Games/>}/>
   )
}

function Games() {
   
   const {width, height} = useWindowDimensions()
   const styles = useGamesStyles({width, height})
   let [searchParams, setSearchParams] = useSearchParams();

   const [games, setGames] = useState()
   console.log((games) && games)
   const [searchData, setSearchData] = useState()
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {

      fetchGame().then(result => {
         setGames(result)
         setSearchData(result)
         setLoading(false)
      })
   }, [searchParams.get('name')])

   // Search Data Game
   const searchHandler = (e) => {

      let value = e.target.value

      if(value) {
         setSearchParams({name: value})
      } else {
         setSearchParams()
      }
   }

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

   const formik = useFormik({
      initialValues: {
        name: '',
        picture: '',
        description: '',
        price: '',
        dateReleased: Date.now(),
        genre: [],
        publisher: '',
      },
      validate,
      onSubmit: async (values) => {
         window.alert(JSON.stringify(values.genre));
         // setLoading(true)
         // await axios.post(`${URL}/gamedb/register`, values)
         // .then(res => {
         //    window.alert(JSON.stringify(res))
         //    setLoading(false)
         // })
         // .catch(err => {
         //    window.alert(JSON.stringify(err))
         //    setLoading(false)
         // })
      }
   });

   return(
      <div className={styles.root}>
         <div className={styles.search}>
            <input value={(searchParams.get('name')) && searchParams.get('name')} type={'search'} className={styles.input} placeholder='Cari game' onChange={searchHandler}/>
         </div>

         <div className={styles.cardContainer}>
            <Fragment>
               <div className={styles.addGame} onClick={() => handleClickOpen()}>
                  <AddIcon
                  sx={{
                     fontSize: '10vw',
                     color: 'white'
                  }}/>
                  <div className={'cover'}/>
               </div>
            {(!isLoading) && 
               games.filter(game => {

                  let search = searchParams.get('name')
                  if(search) {
                     return game.name.toLowerCase().includes(search) || game.name.includes(search)
                  } else {
                     return game
                  }
               }).map((game, index, array) => (
                  <div key={game.id} className={styles.cardGame} style={{zIndex: '99'-index}} id={game.idGame}>
                     <img
                     onError={(currentTarget) => {
                        currentTarget.target.onerror = null; // prevents looping
                        currentTarget.target.src=empty
                      }}
                     className={styles.picture} src={game.picture}/>
                     <div className={'bodyContent'}>
                        <div style={{
                           width: '100%',
                           display: 'flex',
                           flexDirection: 'row',
                           justifyContent: 'flex-end'
                        }}>
                           <FileUploadIcon sx={{
                              color: 'white',
                              fontSize: '5vh',
                              '&:hover': {
                                 color: 'black'
                              }
                           }}/>
                        </div>
                        <span className={styles.name}>{game.name}</span>
                        <p className={styles.description}>{game.description}</p>
                        {/* <div style={{display: 'flex'}}>
                           <div style={{height: '100%', borderRight: '10px solid white'}}/> */}
                        <span className={styles.price}>
                           {(game.price == 0) ? <span>Free to Play</span> : <span>{formatHarga(game.price)},-</span>}
                        </span>
                        {/* </div> */}
                        <div className={styles.genreContainer}>
                           {game.genre.map(genre => (
                              <div key={genre} className={styles.genre}>
                                 {genre}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               ))               
            }
            </Fragment>
         </div>

         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={true}
         >
            <DialogTitle>{"POST Game"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  <Alert variant={'standard'} severity={'info'} sx={{width: '100%', fontFamily: 'Homenaje', fontSize: '120%', letterSpacing: '1.2px', boxSizing: 'border-box', fontWeight: 'bold'}}>
                     /api/v1/gamedb/register
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
                     label="Nama Game"
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     error={formik.touched.name && Boolean(formik.errors.name)}
                     helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                     fullWidth
                     id="picture"
                     name="picture"
                     label="Cover Game"
                     value={formik.values.picture}
                     onChange={formik.handleChange}
                     error={formik.touched.picture && Boolean(formik.errors.picture)}
                     helperText={formik.touched.picture ? formik.errors.picture : 'Gunakan link yang valid untuk gambar!'}
                  />
                  <TextareaAutosize
                     minRows={2}
                     fullWidth
                     id="description"
                     name="description"
                     placeholder="Deskripsi Game"
                     value={formik.values.description}
                     onChange={formik.handleChange}
                     error={formik.touched.description && Boolean(formik.errors.description)}
                     helperText={formik.touched.description && formik.errors.description}
                  />
                  <TextField
                     fullWidth
                     id="price"
                     name="price"
                     label="Harga Game"
                     value={formik.values.price}
                     onChange={formik.handleChange}
                     error={formik.touched.price && Boolean(formik.errors.price)}
                     helperText={formik.touched.price && formik.errors.price}
                  />
                  <Autocomplete
                     multiple
                     label="Genre"
                     error={formik.touched.genre && Boolean(formik.errors.genre)}
                     helperText={formik.touched.genre ? formik.errors.genre : 'Pisahkan dengan koma, Contoh: Open World, Free to Play'}
                     options={genres.map((option) => option.genre)}
                     freeSolo
                     renderTags={(value, getTagProps) => {
                        console.log(value, 'test')
                        formik.values.genre = value
                        return value.map((option, index) => (
                           <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))}
                     }
                     renderInput={(params) => (
                        <TextField
                           {...params}
                           variant="filled"
                           label="Genres"
                           id="genre"
                           name="genre"
                           placeholder="Masukkan genre"
                        />
                     )}
                  />
                  <TextField
                     fullWidth
                     id="publisher"
                     name="publisher"
                     label="Publisher"
                     value={formik.values.publisher}
                     onChange={formik.handleChange}
                     error={formik.touched.publisher && Boolean(formik.errors.publisher)}
                     helperText={formik.touched.publisher && formik.errors.publisher}
                  />
                  <Button color="primary" variant="contained" fullWidth type="submit">
                     POST
                  </Button>
               </form>
            </DialogContent>
         </Dialog>

         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 99999991 }}
            open={isLoading}
            >
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <CircularProgress color="inherit" />
            </div>
         </Backdrop>
      </div>
   )
}

const genres = [
   { genre: 'Free to Play'},
   { genre: 'Open World'},
   { genre: 'Multiplayer'},
   { genre: 'Singleplayer'},
   { genre: 'Coop'},
   { genre: 'MOBA'},
   { genre: "First Person Shooter"},
]