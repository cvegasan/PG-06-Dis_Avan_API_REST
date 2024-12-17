import pool from "../config/config.js";
import format from "pg-format";

export const prepararHATEOAS = (inventario) => {

  const results = inventario
    .map((m) => {
      return {
        name: m.nombre,
        categoria: m.categoria,
        metal: m.metal,
        precio: m.precio,
        href: `/inventario/joya/${m.id}`,
      };
    })
    .slice(0, inventario.length);

  //Formato para HATEOAS
  const totalJoyas = inventario[0].total_joyas;
  const stockTotal = inventario[0].total_stock;
  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results,
  };
  return HATEOAS;
};

//Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base de datos
export const ObtenerTodasJoyas = async (req, res) => {
  try {
      const formatttedQuery=`
      SELECT
        (SELECT SUM(stock) FROM (SELECT stock FROM inventario i2 order by stock) AS limited_stock) AS total_stock
        ,(SELECT COUNT(1) FROM (SELECT 1 FROM inventario i2) AS limited_rows) AS total_joyas
        ,*
      FROM inventario
      ORDER BY id ASC;`
      const { rows: inventario } = await pool.query(formatttedQuery);
      return inventario;
  } catch (error) {
      res.status(500).send("Error al obtener el inventario");
  }
};

//Obtener las joyas por limits, page y ordenar las joyas según el valor de este parámetro, ejemplo:
//stock_ASC
export const Obtenerjoyaslimitadas = async ({
  limits = 5,
  order_by = "id_ASC",
  page = 1,
}) => {
  const [campo, direccion] = order_by.split("_");
  const offset = (page - 1) * limits;
  const formatttedQuery = format(
    // "SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s",
  `SELECT
      (SELECT SUM(stock) FROM (SELECT stock FROM inventario i2 order by %s %s LIMIT %s OFFSET %s) AS limited_stock) AS total_stock
      ,(SELECT COUNT(1) FROM (SELECT 1 FROM inventario i2 LIMIT %s OFFSET %s) AS limited_rows) AS total_joyas
      ,nombre
      ,id
      ,stock
  FROM inventario
  ORDER BY %s %s
  LIMIT %s
  OFFSET %s;
  `,
  campo,
  direccion,
  limits,
  offset,
  limits,
  offset,
  campo,
  direccion,
  limits,
  offset
  );
  const { rows: inventario } = await pool.query(formatttedQuery);
  return inventario;
};

export const filtrarjoyas = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];
  const values = [];

  const agregarFiltro = (campo, comparador, valor) => {
    if (valor !== undefined && valor !== null) {
      values.push(valor);
      const { length } = filtros;
      filtros.push(`${campo} ${comparador} $${length + 1}`);
    }
  };
  console.log(precio_max,'<---');
  agregarFiltro("precio", "<", precio_min); //Filtrar las joyas con un precio menor al valor recibido
  agregarFiltro("precio", ">", precio_max); //Filtrar las joyas con un precio mayor al valor recibido
  agregarFiltro("categoria", "=", categoria);
  agregarFiltro("metal", "=", metal);

  let consulta = `
    SELECT
      *
    FROM inventario `;

  if (filtros.length > 0) {
    consulta += ` WHERE ${filtros.join(" AND ")}`;
  }

  console.log("Consulta generada:", consulta, "Valores:", values);

  try {
    const { rows: inventario } = await pool.query(consulta, values);
    return inventario;
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw error;
  }
};
