import { Request, Response } from "express"
import { valorantClient } from "../api/valorant"

export const getValorantAccountByUsernameTag = async (req: Request, res: Response) => {
  try {
    const { username, tag } = req.params

    if (!username || !tag) {
      return res.status(400).json({ error: "username and tag are required" })
    }

    const response = await valorantClient.get(`/v2/account/${username}/${tag}`)

    return res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Could not get valorant account: GET_VALORANT_ACCOUNT_BY_USERNAME_TAG" })
  }
}

export const getValorantAccountById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: "id is required" })
    }

    const response = await valorantClient.get(`/v2/by-puuid/account/${id}`)

    return res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Could not get valorant account: GET_VALORANT_ACCOUNT_BY_ID" })
  }
}
