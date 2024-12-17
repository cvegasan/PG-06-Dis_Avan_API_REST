//import (módulos ES6)
//require (CommonJS)

import express from "express";
import cors from "cors";
import JewelRoutes from "./routes/JewelRoutes.js";
import dotenv from "dotenv"; // Usar import en lugar de require
import { generarReporte } from './middlewares/reportMiddleware.js';

// Obtener el puerto desde el archivo .env o usar un valor por defecto
dotenv.config();
const PORT = process.env.PORT || 3000;

//Middleware setup
const app = express();
app.use(cors());
app.use(express.json());

app.use(generarReporte); //middleware nuevo que genera archivo informe.log

//Ruta para los posts
app.use(JewelRoutes);

//Inicializa el server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
