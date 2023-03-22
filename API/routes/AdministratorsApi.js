import express from "express";
import {
  verificarAuth,
  verificarAdministador,
} from "../middlewares/autenticacion"; //importamos el middleware para verificar
import AdminsModel from "../models/AdministratorsModel";
const router = express.Router();
// importaciones para encriptacion de pass
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Filtrado de campos de actualización PUT
const _ = require("underscore");

//=========================================================== CREACIÓN DE USUARIOS======================================================================================================

router.post("/create-admin", async (req, res) => {
  const body = req.body;
  body.password = bcrypt.hashSync(req.body.password, saltRounds);
  try {
    const createAdmin = await AdminsModel.create(body);
    res
      .status(200)
      .json(
        `Usuario ${createAdmin.role}: ${createAdmin.firstName} ${createAdmin.lastName} creado correctamente.`
      );
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error al crear un nuevo administrador",
      error,
    });
  }
});

// //READ con parámetros
// router.get("/read-user/:id", [verificarAuth], async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const read = await UserModel.findOne({ _id });
//     res.json(read);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

// // READ todos los usuarios
// router.get("/get-users", [verificarAuth], async (req, res) => {
//   try {
//     const usersDB = await UserModel.find();
//     res.json(usersDB);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

// // UPDATE
// router.put("/update-user/:id", [verificarAuth], async (req, res) => {
//   //samos el middleware para impedir que n suario no registrado haga cambios
//   const _id = req.params.id;
//   const body = _.pick(req.body, ["nombre", "email", "password", "activo"]); //En este método se declara en el array que campos de la db puede modificar el usr

//   //Verificamos si el usr cambió la contraseña para poder reencriptar la nueva
//   if (body.password) {
//     body.password = bcrypt.hashSync(req.body.password, saltRounds);
//   }
//   try {
//     const update = await UserModel.findByIdAndUpdate(_id, body, {
//       new: true,
//       runValidators: true /*activamos validaciones para por ejemplo que no se repita el correo o que se aplique el enum de roles del modelo */,
//     });
//     res.json(update);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

// // DELETE
// router.delete("/delete-user/:id", [verificarAuth], async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const destroy = await UserModel.findByIdAndDelete({ _id });
//     if (!destroy) {
//       return res.status(400).json({
//         mensaje: "No se encontró el id indicado",
//         error,
//       });
//     }
//     res.json(destroy);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

// Exportamos la configuración de express app
module.exports = router;
