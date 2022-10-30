// const URL = 'http://192.168.100.10:5000/api/v1'
const URL = 'https://cnet10sept.herokuapp.com/api/v1'

export async function fetchGame() {
   let game = await fetch(`${URL}/gamedb`)
   return await game.json()
}

export async function fetchSteamDB() {
   let steamdb = await fetch(`${URL}/steamdb`)
   return await steamdb.json()
}