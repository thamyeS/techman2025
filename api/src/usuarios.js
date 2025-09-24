import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { senha } = req.body;
  const user = await prisma.usuario.findFirst({
    where: { senha },
    include: { perfil: true },
  });

  if (!user) return res.status(401).json({ error: "Senha incorreta" });
  res.json(user);
});

router.get("/", async (req, res) => {
  const usuarios = await prisma.usuario.findMany({ include: { perfil: true } });
  res.json(usuarios);
});

router.post("/", async (req, res) => {
  const { senha, perfilId } = req.body;
  const novo = await prisma.usuario.create({
    data: { senha, perfilId },
  });
  res.json(novo);
});

export default router;
