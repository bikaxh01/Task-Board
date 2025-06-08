import { prisma } from "../config/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { sendResponse, STATUS } from "../utils/status";
import jwt from "jsonwebtoken";
config();

const passwordSalt = bcrypt.genSaltSync(10);

export async function signUp(req: Request, res: Response) {
  const { email, password, fullName } = req.body;
  console.log("🚀 ~ signUp ~ email:", email);

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return sendResponse(
        res,
        STATUS.ALREADY_EXISTS,
        "Email already in used",
        []
      );
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(password, passwordSalt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    });

    return sendResponse(res, STATUS.CREATED, "User created", user);
  } catch (error) {
    console.log("🚀 ~ signUp ~ error:", error);
    return sendResponse(
      res,
      STATUS.INTERNAL_ERROR,
      "something went wrong",
      [],
      "error occurred while creating user"
    );
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return sendResponse(res, STATUS.NOT_FOUND, "Email not registered", []);
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
  

    if (!verifyPassword) {
      return sendResponse(res, STATUS.UNAUTHORIZED, "Incorrect password");
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, jwtSecret as string);
    res.cookie("authToken", token);
    return sendResponse(res, STATUS.SUCCESS, "successfully signed In");
  } catch (error) {
    return sendResponse(
      res,
      STATUS.INTERNAL_ERROR,
      "something went wrong",
      [],
      "error occurred while signing in"
    );
  }
}

export async function createBoard(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    //@ts-ignore
    const userId = req.userId;

    const board = await prisma.board.create({
      data: {
        title,
        description,
        adminId: userId,
        column: {
          create: {
            title: "TODO",
          },
        },
      },
    });

    return sendResponse(res, STATUS.CREATED, "Successfully created", board);
  } catch (error) {
    console.log("🚀 ~ createBoard ~ error:", error);
    return sendResponse(
      res,
      STATUS.INTERNAL_ERROR,
      "something went wrong while creating board",
      [],
      "error occurred while signing in"
    );
  }
}

export async function getAllBoards(req: Request, res: Response) {
  try {
    //@ts-ignore
    const userId = req.userId;

    const boards = await prisma.board.findMany({
      where: {
        adminId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return sendResponse(res, STATUS.SUCCESS, "Successfully created", boards);
  } catch (error) {
    console.log("🚀 ~ getAllBoards ~ error:", error);
    return sendResponse(
      res,
      STATUS.INTERNAL_ERROR,
      "something went wrong while getting all boards",
      []
    );
  }
}

export async function getBoard(req: Request, res: Response) {
  try {
    //@ts-ignore
    //const userId = req.userId;
    const { boardId } = req.query;
    if (!boardId || typeof boardId !== "string") {
      return sendResponse(res, STATUS.INVALID_DATA, "Invalid Req ", []);
    }
    const board = await prisma.board.findUnique({
      where: {
        //  adminId: userId,
        id: boardId,
      },
      include: {
        column: {
          include: {
            task: true,
          },
        },
      },
    });
    return sendResponse(res, STATUS.SUCCESS, "Successfully fetched", board);
  } catch (error) {
    console.log("🚀 ~ getAllBoards ~ error:", error);
    return sendResponse(
      res,
      STATUS.INTERNAL_ERROR,
      "something went wrong while getting all boards",
      [],
      "error occurred while signing in"
    );
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    //@ts-ignore
    const userId = req.userId;
    const { colName, taskTitle, boardId } = req.body;

    const findCol = await prisma.column.findFirst({
      where: {
        boardId,
        title: colName,
      },
    });

    if (!findCol) {
      return sendResponse(res, STATUS.NOT_FOUND, "Invalid Col");
    }

    const addCol = await prisma.task.create({
      data: {
        label: "LOW",
        position: 0,
        title: taskTitle,
        columnId: findCol?.id,
      },
    });

    return sendResponse(res, STATUS.CREATED, "created Success", addCol);
  } catch (error) {
    return sendResponse(res, STATUS.INTERNAL_ERROR, "Internal server error");
  }
}

export async function createColumn(req: Request, res: Response) {
  try {
    ///@ts-ignore
    const userId = req.userId;

    const { boardId, title } = req.body;

    const col = await prisma.column.create({
      data: {
        title: title,
        boardId,
      },
      include: {
        task: true,
      },
    });
    return sendResponse(res, STATUS.CREATED, "Created Column", col);
  } catch (error) {
    return sendResponse(res, STATUS.INTERNAL_ERROR, "Internal server error");
  }
}
