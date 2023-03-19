/*Para personalizar cambiar en todo el documento:

ejemploSchema por el nombre apropiado 

UserModel por el nombre apropiado, el cual debe coincidir con el nombre de éste archivo

*/

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator"); //inclusion del plugin de validación unico
const permissions = {
  values: ["CREATE", "READ", "UPDATE", "DELETE"],
  message: "{VALUE} rol no valido",
};

const adminsSchema = new Schema({
  rut: { type: String, unique: true, required: [true, "RUT obligatorio"] },
  firstName: { type: String, required: [true, "nombre obligatorio"] },
  secondName: { type: String },
  lastName: { type: String, required: [true, "nombre obligatorio"] },
  password: { type: String, required: [true, "password obligatorio"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  startDate: { type: Date, required: [true, "fecha de inicio obligatoria"] },
  endingDate: {
    type: Date,
    required: [true, "fecha de finalización obligatoria"],
  },
  role: { type: String, default: "ADMIN" /*enum: roles*/ },
  permissions: [
    {
      permisson: { type: String, enum: permissions, default: "READ" },
    },
  ],
  state: { type: Boolean, default: false },
  consumos: [], //Modificar cuado se defina de forma efectiva cómo se realizará la dinámica de consumos
});

// Apply the uniqueValidator plugin to userSchema.
adminsSchema.plugin(uniqueValidator, {
  message: "Error, Ya existe un Administrador registrado con el rut: {PATH}.",
});

//Ocultación de pass para no retornarlo a la vista
adminsSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// Convertir a modelo
const AdminsModel = mongoose.model("admins", adminsSchema); //El nombre que figura como String en el parámetro es el nombre que tendrá la colección en la DB

export default AdminsModel;
