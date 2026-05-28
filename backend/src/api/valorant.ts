import axios from "axios"

export const valorantClient = axios.create({
  baseURL: "https://api.henrikdev.xyz/valorant",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': process.env.VALORANT_API_KEY
  }
})
