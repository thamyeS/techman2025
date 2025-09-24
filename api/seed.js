import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const perfis = [
    { id: 1, perfil: "Comum" },
    { id: 2, perfil: "Administrador" },
    { id: 3, perfil: "Técnico" },
    { id: 4, perfil: "Gerente" },
  ];

  for (const p of perfis) {
    await prisma.perfil.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  const usuariosCsv = fs
    .readFileSync(path.join("prisma", "usuarios.csv"), "utf-8")
    .split("\n")
    .slice(1)
    .filter(Boolean);

  for (const linha of usuariosCsv) {
    const [id, nome, email, senha, perfilId] = linha.split(";");
    await prisma.usuario.upsert({
      where: { id: Number(id) },
      update: {},
      create: {
        id: Number(id),
        nome,
        email,
        senha,
        perfilId: Number(perfilId),
      },
    });
  }


  await prisma.usuario.upsert({
    where: { id: 999 },
    update: {},
    create: {
      id: 999,
      nome: "Usuário Padrão",
      email: "default@example.com",
      senha: "123456",
      perfilId: 1,
    },
  });

  const equipamentosCsv = fs
    .readFileSync(path.join("prisma", "equipamentos.csv"), "utf-8")
    .split("\n")
    .slice(1)
    .filter(Boolean);

  for (const linha of equipamentosCsv) {
    const [id, nome, descricao] = linha.split(";");
    await prisma.equipamento.upsert({
      where: { id: Number(id) },
      update: {},
      create: {
        id: Number(id),
        nome,
        descricao,
      },
    });
  }

  const comentariosCsv = fs
    .readFileSync(path.join("prisma", "comentarios.csv"), "utf-8")
    .split("\n")
    .slice(1)
    .filter(Boolean);

  for (const linha of comentariosCsv) {
    const [id, texto, usuarioId, equipamentoId, dataInclusao] = linha.split(";");
    const usuarioValido = usuarioId && !isNaN(usuarioId) ? Number(usuarioId) : 999;

    await prisma.comentario.upsert({
      where: { id: Number(id) },
      update: {},
      create: {
        id: Number(id),
        texto,
        usuarioId: usuarioValido,
        equipamentoId: Number(equipamentoId),
        dataInclusao: new Date(dataInclusao),
      },
    });
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
