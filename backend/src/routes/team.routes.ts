import { Router } from "express";
import {
  createTeamController,
  joinTeamByCodeController,
  getUserTeamsController,
  getUserController,
  getTeamController,
} from "../controllers/team.controller";
import { authenticateToken } from "../middlewares/authenticate";

const userRoutes: Router = Router();

userRoutes.post("/createTeam", authenticateToken, createTeamController);
userRoutes.post("/joinTeam", authenticateToken, joinTeamByCodeController);

userRoutes.get("/teams", authenticateToken, getUserTeamsController);
userRoutes.get("/team/:teamId", authenticateToken, getTeamController);

userRoutes.get("/me", authenticateToken, getUserController);

export default userRoutes;
