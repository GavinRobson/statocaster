import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = [
      { id: 1, username: "gavin" },
      { id: 2, username: "john" },
    ];

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const newUser = {
      id: Date.now(),
      username,
    };

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create user",
    });
  }
};
