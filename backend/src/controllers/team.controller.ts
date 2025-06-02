import { Request, Response, NextFunction, RequestHandler } from "express";
import { prismaClient } from "../lib/prisma";
import { teamsType } from "../models/teams";
import { UserRole } from "@prisma/client";

// Criar equipe
export const createTeamController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    const user = await prismaClient.user.findFirst({
      where: { id: userId }, // Buscar o usuário pelo userId
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const { name, description }: teamsType = req.body;

    // gerar um código aleatório para a equipe
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const team = await prismaClient.team.create({
      data: {
        name,
        description,
        code,
        members: {
          create: {
            userId: user!.id,
            role: UserRole.OWNER,
          },
        },
        channels: {
          create: {
            name: "general",
          },
        },
      },
      include: {
        members: {
          include: { user: true },
        },
        channels: true,
      },
    });

    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

// Entrar em equipe via código
export const joinTeamByCodeController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    const user = await prismaClient.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized: no userId" });
      return;
    }
    const { code } = req.body;

    const team = await prismaClient.team.findUnique({
      where: { code },
      select: {
        id: true,
      },
    });

    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    // checar se o usuário já faz parte
    const existingMember = await prismaClient.teamMember.findFirst({
      where: {
        userId: user!.id,
        teamId: team.id,
      },
    });

    if (!existingMember) {
      await prismaClient.teamMember.create({
        data: {
          userId: user!.id,
          teamId: team.id,
          role: UserRole.MEMBER,
        },
      });
    }

    res.status(200).json({ team });
  } catch (error) {
    next(error);
  }
};

export const getUserTeamsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: no userId" });
      return;
    }

    const teams = await prismaClient.team.findMany({
      where: {
        members: {
          some: {
            userId: Number(userId),
          },
        },
      },
      include: {
        members: true,
      },
    });

    // Retorna as equipes
    res.status(200).json({ teams });
  } catch (error) {
    next(error);
  }
};

export const getUserController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: no userId" });
      return;
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    // Retorna as equipes
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// PROCURAR UMA UNICA EQUIPE
export const getTeamController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: no userId" });
      return;
    }

    const { teamId } = req.params;

    const team = await prismaClient.team.findUnique({
      where: {
        id: Number(teamId),
      },
      include: {
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc",
          },
        },
        channels: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    // Retorna as equipes
    res.status(200).json({ team });
  } catch (error) {
    next(error);
  }
};
