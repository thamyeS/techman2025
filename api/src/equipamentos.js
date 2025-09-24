import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Listar equipamentos
router.get("/", async (req, res) => {
  const equipamentos = await prisma.equipamento.findMany();
  res.json(equipamentos);
});

// Criar equipamento
router.post("/", async (req, res) => {
  const { nome, descricao, imagemUrl } = req.body;
  const novo = await prisma.equipamento.create({
    data: { nome, descricao, imagemUrl },
  });
  res.json(novo);
});

// Excluir equipamento
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.comentario.deleteMany({ where: { equipamentoId: id } });
  await prisma.equipamento.delete({ where: { id } });
  res.json({ message: "Equipamento excluído" });
});

export default router;
