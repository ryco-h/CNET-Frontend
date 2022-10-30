import { Route, Routes } from 'react-router-dom'
import GamesIndex from '../components/Games/games'
import MainpageIndex from '../components/Mainpage/mainpage'
import PublisherIndex from '../components/Publisher/publisher'

export default function Routing() {

   return(
      <Routes>
         <Route path='/' element={<MainpageIndex/>}/>
         <Route path='/games' element={<GamesIndex/>}/>
         <Route path='/publishers' element={<PublisherIndex/>}/>
      </Routes>
   )
}