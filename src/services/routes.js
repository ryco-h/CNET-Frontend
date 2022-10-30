import { Route, Routes } from 'react-router-dom'
import GamesIndex from '../components/Games/games'
import MainpageIndex from '../components/Mainpage/mainpage'

export default function Routing() {

   return(
      <Routes>
         <Route path='/' element={<MainpageIndex/>}/>
         <Route path='/games' element={<GamesIndex/>}/>
      </Routes>
   )
}