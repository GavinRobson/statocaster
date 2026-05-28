import axios from "axios"

export const riotClient = axios.create({
  baseURL: "https://americas.api.riotgames.com/riot",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Riot-Token': process.env.RIOT_API_KEY
  }
})
