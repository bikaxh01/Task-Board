import { NextFunction, Request, Response } from "express";
import { sendResponse, STATUS } from "../utils/status";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { prisma } from "../config/db";

config();

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.authToken;
    

    const jwtSecret = process.env.JWT_SECRET;

    if (!token) {
      return sendResponse(res, STATUS.UNAUTHORIZED, "no token");
    }

    // decode token
    const { email, id }: any = jwt.verify(token, jwtSecret as string);
  

    if (!email || !id) {
      return sendResponse(res, STATUS.UNAUTHORIZED, "Unauthorized");
    }
    // validate user
    const verifyUser = await prisma.user.findUnique({
      where: {
        id,
        email,
      },
    });

    if (!verifyUser) {
      return sendResponse(res, STATUS.UNAUTHORIZED, "user doesn't exists");
    }
    req.body.userId = verifyUser.id;

    // next
    next();
  } catch (error) {
    console.log("🚀 ~ error:", error)
    res.clearCookie("authToken");

    return sendResponse(res, STATUS.UNAUTHORIZED, "Unauthorized user");
  }
}



