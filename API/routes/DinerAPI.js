/* 
Para personalizar cambiar en todo el documento:

UserModel por el nombre del modelo que se va a tratar en el CRUD

Recordar que se puede personalizar de forma más clara las rutas de cada una de las operaciones CRUD

*/

import express from "express";
import UserModel from "../models/DinersModel"; //Verificar que la ruta del modelo personalizado sea la correcta.
import {
  verificarAuth,
  verificarAdministador,
} from "../middlewares/autenticacion"; //importamos el middleware para verificar
const router = express.Router();
// importaciones para encriptacion de pass
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Filtrado de campos de actualización PUT
const _ = require("underscore");

//=========================================================== CREACIÓN DE USUARIOS======================================================================================================

// router.post("/create-admin", async (req, res) => {
//   //Desestructuramos el body para poder encriptar la contraseña con bcrypt

//   const body = {
//     nombre: req.body.nombre,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   body.password = bcrypt.hashSync(req.body.password, saltRounds);
//   try {
//     const create = await UserModel.create(body);
//     res.status(200).json(create);
//   } catch (error) {
//     return res.status(500).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

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
