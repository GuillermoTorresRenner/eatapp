import express from "express";
import { token } from "morgan";
const router = express.Router();
const multer = require("multer");
import path from "path";
import { verificarAuth } from "../middlewares/autenticacion";
const { v4: uuidv4 } = require("uuid");
import CharacterModel from "../Examples/ExampleModels/CharactersModel";
const fs = require("fs");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename = uuidv4() + file.originalname; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    cb(null, filename);
  },
  destination: "public/uploads",
});
const upload = multer({
  dest: "public/uploads",
  storage,
  limits: { fileSize: 3000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|bmp|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimetype === extname) {
      return cb(null, true);
    }
    cb("El archivo debe ser una imágen válida: jpg|jpeg|png|bmp|gif");
  },
});

// Agregar una Personaje
router.post(
  "/create-character",
  [verificarAuth],
  upload.single("img"),
  async (req, res) => {
    const char = JSON.parse(req.body.personaje);

    if (req.file) {
      char.avatar = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    try {
      const createCharacter = await CharacterModel.create(char);
      res.status(200).json({ message: "Personaje guardado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "El personaje no se pudo guardar", error });
    }
  }
);

// Get con parámetros
router.get("/read/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Nota.findOne({ _id });
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Get con todos los personajes del usuario
router.get("/get-characters/:userId", [verificarAuth], async (req, res) => {
  const id = req.params.userId;
  try {
    const characterDB = await CharacterModel.find({ userId: id });
    res.json(characterDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Delete eliminar una nota
router.delete("/delete-character/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const chDB = await CharacterModel.findOne({ _id });
    const p = chDB.avatar.substring(chDB.avatar.lastIndexOf("/"));
    fs.unlinkSync(`public/uploads${p}`);
    const characterDB = await CharacterModel.findByIdAndDelete({ _id });

    res.status(200).json({ message: "Personaje eliminado" });
  } catch (error) {
    res.status(400).json({
      message: "Ocurrio un error",
      error,
    });
  }
});

// Put actualizar una nota
router.put(
  "/update-character/:id",
  [verificarAuth],
  upload.single("img"),
  async (req, res) => {
    const _id = req.params.id;
    const char = JSON.parse(req.body.personaje);
    const pathImage = req.body.avatar;
    const newFile = req.file;
    if (pathImage && newFile) {
      //Borrar imagen antigua y actualizar DB con path de nueva imagen
      const p = pathImage.substring(pathImage.lastIndexOf("/"));

      try {
        fs.unlinkSync(`public/uploads${p}`);
      } catch (error) {
        console.log(error);
      }
      char.avatar = `http://localhost:3000/uploads/${req.file.filename}`;
    }
    if (!pathImage && newFile) {
      //Actualizar DB con path de nueva imagen
      char.avatar = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    try {
      const characterDB = await CharacterModel.findByIdAndUpdate(_id, char, {
        new: true,
      });
      res.status(200).json({ message: "Personaje Actualizado" });
    } catch (error) {
      return res.status(400).json({
        message: "Ocurrio un error",
        error,
      });
    }
  }
);

// Exportación de router
module.exports = router;
