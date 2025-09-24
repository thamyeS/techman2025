import express from "express";
import cors from "cors";
import router from "./router.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/assests", express.static(path.join(__dirname, "../../assets")));

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
);