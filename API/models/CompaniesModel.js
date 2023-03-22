/*Para personalizar cambiar en todo el documento:

ejemploSchema por el nombre apropiado 

UserModel por el nombre apropiado, el cual debe coincidir con el nombre de éste archivo

*/

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator"); //inclusion del plugin de validación unico

const companiesSchema = new Schema({
  rut: { type: String, unique: true, required: [true, "RUT obligatorio"] },
  companyName: { type: String, required: [true, "nombre obligatorio"] },
  location: { type: String },

  password: { type: String, required: [true, "password obligatorio"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  startDate: { type: Date, required: [true, "fecha de inicio obligatoria"] },
  endingDate: {
    type: Date,
    required: [true, "fecha de finalización obligatoria"],
  },
  role: { type: String, default: "COMPANY" /*enum: roles*/ },
  state: { type: Boolean, default: false },
  services: [], //Modificar cuado se defina de forma efectiva cómo se realizará la dinámica de consumos
});

// Apply the uniqueValidator plugin to userSchema.
companiesSchema.plugin(uniqueValidator, {
  message: "Error, Ya existe una Empresa registrado con el rut: {VALUE}.",
});

//Ocultación de pass para no retornarlo a la vista
companiesSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// Convertir a modelo
const CompaniesModel = mongoose.model("companies", companiesSchema); //El nombre que figura como String en el parámetro es el nombre que tendrá la colección en la DB

export default CompaniesModel;
