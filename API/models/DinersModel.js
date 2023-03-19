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

const dinersSchema = new Schema({
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
  role: { type: String, default: "DINER" /*enum: roles*/ },
  state: { type: Boolean, default: false },
  consumos: [], //Modificar cuado se defina de forma efectiva cómo se realizará la dinámica de consumos
});

// Apply the uniqueValidator plugin to userSchema.
dinersSchema.plugin(uniqueValidator, {
  message: "Error, Ya existe un trabajador registrado con el rut: {PATH}.",
});

//Ocultación de pass para no retornarlo a la vista
dinersSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// Convertir a modelo
const DinersModel = mongoose.model("diners", dinersSchema); //El nombre que figura como String en el parámetro es el nombre que tendrá la colección en la DB

export default DinersModel;
