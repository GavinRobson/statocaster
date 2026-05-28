import { Request, Response } from "express"
import { riotClient } from "../api/riot"

export const getRiotAccountByUsernameTag = async (req: Request, res: Response) => {
  try {
    const response = await riotClient.get("/account/v1/accounts/by-riot-id/imsobored/6969")

    return res.status(200).json(response.data)
  } catch (error) {
    return res.status(500).json({ error: "Failed to get riot account: GET_RIOT_ACCOUNT_BY_USERNAME_TAG" })
  }
}
