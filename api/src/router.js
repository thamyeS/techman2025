import express from "express";
import comentariosRoutes from "./comentarios.js";
import equipamentosRoutes from "./equipamentos.js";
import perfilRoutes from "./perfil.js";
import usuariosRoutes from "./usuarios.js";

const router = express.Router();

router.use("/comentarios", comentariosRoutes);
router.use("/equipamentos", equipamentosRoutes);
router.use("/perfil", perfilRoutes);
router.use("/usuarios", usuariosRoutes);

export default router;