import { Request, Response } from "express";
import { prisma } from "../db/db";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users: GET_USERS",
    });
  }
};

export const getUserByUsernameTag = async (req: Request<{ username: string; tag: string }>, res: Response) => {
  try {
    const { username, tag } = req.params;

    if (!username || !tag) {
      return res.status(400).json({ error: "username and tag are required." })
    }

    const user = await prisma.user.findUnique({
      where: {
        username_tag: {
          username,
          tag,
        }
      },
      omit: {
        password: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user: GET_USER_BY_USERNAME_TAG" })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({ error: "id is required" })
    }

    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true }
    })

    if (!user) {
      return res.status(404).json({ error: "User not fonud" })
    }

    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch user: GET_USER_BY_ID"
    })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, tag } = req.body;

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const existingUsernameTag = await prisma.user.findUnique({
      where: {
        username_tag: {
          username,
          tag,
        },
      },
    });

    if (existingUsernameTag) {
      return res.status(409).json({ error: "Username and tag already exists." })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        tag,
        email,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create user: CREATE_USER",
    });
  }
};
