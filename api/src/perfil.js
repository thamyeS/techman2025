import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const perfis = await prisma.perfil.findMany();
  res.json(perfis);
});

router.post("/", async (req, res) => {
  const { nome } = req.body;
  const perfil = await prisma.perfil.create({ data: { nome } });
  res.json(perfil);
});

export default router;
