import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const novoComentarioBtn = document.getElementById("novo-comentario-btn");
const modalNovoComentario = document.getElementById("modal-novo-comentario");
const cancelarComentario = document.getElementById("cancelar-comentario");

novoComentarioBtn.addEventListener("click", () => {
  modalNovoComentario.classList.remove("hidden");
});

cancelarComentario.addEventListener("click", () => {
  modalNovoComentario.classList.add("hidden");
});


router.get("/:equipamentoId", async (req, res) => {
  const equipamentoId = parseInt(req.params.equipamentoId);
  const comentarios = await prisma.comentario.findMany({
    where: { equipamentoId },
    include: {
      usuario: {
        include: { perfil: true }
      }
    },
    orderBy: { dataInclusao: "desc" },
  });
  res.json(comentarios);
});


router.post("/", async (req, res) => {
  const { texto, usuarioId, equipamentoId } = req.body;
  const comentario = await prisma.comentario.create({
    data: { texto, usuarioId, equipamentoId },
    include: {
      usuario: {
        include: { perfil: true }
      }
    }
  });
  res.json(comentario);
});

export default router;
