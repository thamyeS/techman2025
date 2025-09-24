import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/auth/index", async (req, res) => {
  const { senha } = req.body;
  const user = await prisma.usuario.findFirst({
    where: { senha },
    include: { perfil: true },
  });

  if (!user) return res.status(401).json({ error: "Senha incorreta" });
  res.json(user);
});
app.get("/equipamentos", async (req, res) => {
  const equipamentos = await prisma.equipamento.findMany();
  res.json(equipamentos);
});

app.post("/equipamentos", async (req, res) => {
  const { nome, descricao, imagemUrl } = req.body;
  const novo = await prisma.equipamento.create({
    data: { nome, descricao, imagemUrl },
  });
  res.json(novo);
});

app.delete("/equipamentos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.comentario.deleteMany({ where: { equipamentoId: id } });
  await prisma.equipamento.delete({ where: { id } });
  res.json({ message: "Equipamento excluído" });
});

app.get("/comentarios/:equipamentoId", async (req, res) => {
  const equipamentoId = parseInt(req.params.equipamentoId);
  const comentarios = await prisma.comentario.findMany({
    where: { equipamentoId },
    include: { usuario: { include: { perfil: true } } },
    orderBy: { dataInclusao: "desc" },
  });
  res.json(comentarios);
});

app.post("/comentarios", async (req, res) => {
  const { texto, usuarioId, equipamentoId } = req.body;
  const comentario = await prisma.comentario.create({
    data: { texto, usuarioId, equipamentoId },
  });
  res.json(comentario);
});

const PORT = 3000;
app.listen(PORT, () => console.log(` Servidor rodando em http://localhost:${PORT}`));