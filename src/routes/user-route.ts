import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "../services/user-service";

export const userRoute = Router();
userRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const users = await UserService.findAllUsers();
  res.json({ users });
}));

userRoute.post("/", asyncHandler(async (req: Request, res: Response) => {
  console.log(req.params);
  
  const { userId, username } = req.params;
  const newUser = await UserService.createUser({ userId, username });
  res.json({ newUser });
}));