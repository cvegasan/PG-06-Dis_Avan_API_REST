import express from "express";
import {
  filtrarjoyas,
  ObtenerTodasJoyas,
  Obtenerjoyaslimitadas,
  prepararHATEOAS,
} from "../controllers/controllers.js";

const router = express.Router();

//Ruta para obtener "TODO" el inventario
router.get("/joyas", async (req, res) => {
  try {
    const inventario = await ObtenerTodasJoyas();
    const HATEOAS = prepararHATEOAS(inventario); //No hace consulta al servidor no lleva await
    res.json({
      status: "success",
      HATEOAS: HATEOAS
    });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({
      status: "error",
      message: "Error al procesar la solicitud",
    });
  }
});


//Ruta para obtener joyas con limit
router.get("/joyas/limit", async (req, res) => {
  try {
    const queryString = req.query;
    const inventario = await Obtenerjoyaslimitadas(queryString);
    const HATEOAS = prepararHATEOAS(inventario); //No hace consulta al servidor no lleva await
    res.json({
      status: "success",
      HATEOAS: HATEOAS,
    });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({
      status: "error",
      message: "Error al procesar la solicitud",
    });
  }
});

//ruta para filtros
router.get("/joyas/filter", async (req, res) => {
  try {
    const queryString = req.query;
    const inventario = await filtrarjoyas(queryString);
    if (inventario.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontraron joyas con los filtros aplicados",
      });
    }
    res.status(200).json({
      status: "success",
      data: inventario,
    });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({
      status: "error",
      message: "Error al procesar la solicitud",
    });
  }
});

export default router;
