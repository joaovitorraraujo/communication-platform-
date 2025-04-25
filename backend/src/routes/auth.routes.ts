import { Router } from "express";
import {
  signInController,
  signUpController,
} from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signUp", signUpController);
authRoutes.post("/signIn", signInController);

export default authRoutes;
