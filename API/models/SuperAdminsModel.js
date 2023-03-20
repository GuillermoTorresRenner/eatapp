/*Para personalizar cambiar en todo el documento:

ejemploSchema por el nombre apropiado 

UserModel por el nombre apropiado, el cual debe coincidir con el nombre de éste archivo

*/

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator"); //inclusion del plugin de validación unico
// const roles = {
//   values: ["DINER", "ADMIN", "SUPERADMIN", "COMPANY"],
//   message: "{VALUE} rol no valido",
// };

const superAdminsSchema = new Schema({
  rut: { type: String, unique: true, required: [true, "RUT obligatorio"] },
  firstName: { type: String, required: [true, "nombre obligatorio"] },
  secondName: { type: String },
  lastName: { type: String, required: [true, "nombre obligatorio"] },
  password: { type: String, required: [true, "password obligatorio"] },
  createdAt: { type: Date, default: Date.now },
});

// Apply the uniqueValidator plugin to userSchema.
superAdminsSchema.plugin(uniqueValidator, {
  message:
    "Error, Ya existe un Super Administrador: registrado con el rut: {PATH}.",
});

//Ocultación de pass para no retornarlo a la vista
superAdminsSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// Convertir a modelo
const SuperAdminsModel = mongoose.model("superAdmins", superAdminsSchema); //El nombre que figura como String en el parámetro es el nombre que tendrá la colección en la DB

export default SuperAdminsModel;
