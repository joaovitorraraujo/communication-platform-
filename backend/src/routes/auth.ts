import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.post("/signUp", signUp);
authRoutes.post("/signIn", signIn);

export default authRoutes;
