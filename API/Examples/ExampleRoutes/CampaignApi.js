import express from "express";
import { token } from "morgan";
const router = express.Router();
import path from "path";
import { verificarAuth } from "../middlewares/autenticacion";
import CampaignModel from "../models/CampaignModel";

// Agregar una Campaña
router.post("/create-campaign", [verificarAuth], async (req, res) => {
  const campaign = req.body;
  console.log(campaign);

  try {
    const createCampaign = await CampaignModel.create(campaign);
    res.status(200).json({ message: "Campaña Creada" });
  } catch (error) {
    res.status(500).json({ message: "La campaña no se pudo guardar", error });
  }
});

// Get con parámetros
router.get("/read/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await CampaignModel.findOne({ _id });
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Get con todos los personajes del usuario
router.get("/get-campaigns/:userId", [verificarAuth], async (req, res) => {
  const userId = req.params.userId;

  try {
    const campaignDB = await CampaignModel.find({ adminId: userId });
    res.json(campaignDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Get con todos las partidas invitas al usuario
router.get(
  "/get-campaigns-invited/:userId",
  [verificarAuth],
  async (req, res) => {
    const userId = req.params.userId;

    try {
      const campaignDB = await CampaignModel.find({
        "jugadores.userId": userId,
      });
      res.json(campaignDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  }
);

// Get partida seleccionada.
router.get("/get-current-campaign/:id", [verificarAuth], async (req, res) => {
  const _id = req.params.id;

  try {
    const campaignDB = await CampaignModel.findOne({ _id });
    res.json(campaignDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Delete eliminar una nota
// router.delete("/delete-character/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const chDB = await CharacterModel.findOne({ _id });
//     const p = chDB.avatar.substring(chDB.avatar.lastIndexOf("/"));
//     fs.unlinkSync(`public/uploads${p}`);
//     const characterDB = await CharacterModel.findByIdAndDelete({ _id });

//     res.status(200).json({ message: "Personaje eliminado" });
//   } catch (error) {
//     res.status(400).json({
//       message: "Ocurrio un error",
//       error,
//     });
//   }
// });

// // Put actualizar una nota
// router.put(
//   "/update-character/:id",
//   [verificarAuth],
//   upload.single("img"),
//   async (req, res) => {
//     const _id = req.params.id;
//     const char = JSON.parse(req.body.personaje);
//     const pathImage = req.body.avatar;
//     const newFile = req.file;
//     if (pathImage && newFile) {
//       //Borrar imagen antigua y actualizar DB con path de nueva imagen
//       const p = pathImage.substring(pathImage.lastIndexOf("/"));

//       try {
//         fs.unlinkSync(`public/uploads${p}`);
//       } catch (error) {
//         console.log(error);
//       }
//       char.avatar = `http://localhost:3000/uploads/${req.file.filename}`;
//     }
//     if (!pathImage && newFile) {
//       //Actualizar DB con path de nueva imagen
//       char.avatar = `http://localhost:3000/uploads/${req.file.filename}`;
//     }

//     try {
//       const characterDB = await CharacterModel.findByIdAndUpdate(_id, char, {
//         new: true,
//       });
//       res.status(200).json({ message: "Personaje Actualizado" });
//     } catch (error) {
//       return res.status(400).json({
//         message: "Ocurrio un error",
//         error,
//       });
//     }
//   }
// );

// Exportación de router
module.exports = router;
