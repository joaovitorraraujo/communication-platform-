import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./team.routes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/user", userRoutes);

export default rootRouter;
