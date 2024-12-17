// Se instala morgan para utilizar el middleware y generar el archivo informe.log

import morgan from 'morgan';
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accessLogStream = fs.createWriteStream(join(__dirname, '../informe.log'), { flags: 'a' });

export const generarReporte = morgan(
  `:date -- method: :method -- url: :url -- status: :status -- response-time: :response-time ms`,
  { stream: accessLogStream }
);