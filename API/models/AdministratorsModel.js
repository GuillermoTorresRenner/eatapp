import mongoose from "mongoose";
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator"); //inclusion del plugin de validación unico
const roles = {
  values: ["ADMIN", "SUPERVISOR", "COMPANY"],
  message: "{VALUE} rol no valido",
};

const administratorsSchema = new Schema({
  rut: { type: String, unique: true, required: [true, "RUT obligatorio"] },
  firstName: { type: String, required: [true, "nombre obligatorio"] },
  secondName: { type: String },
  lastName: { type: String, required: [true, "nombre obligatorio"] },
  password: { type: String, required: [true, "password obligatorio"] },
  firstPassword: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },

  role: { type: String, default: "SUPERVISOR", enum: roles },

  state: { type: Boolean, default: true },
});

// Apply the uniqueValidator plugin to userSchema.
administratorsSchema.plugin(uniqueValidator, {
  message: "Error, Ya existe un Administrador registrado con el rut: {VALUE}.",
});

//Ocultación de pass para no retornarlo a la vista
administratorsSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// Convertir a modelo
const AdministratorsModel = mongoose.model(
  "administrators",
  administratorsSchema
); //El nombre que figura como String en el parámetro es el nombre que tendrá la colección en la DB

export default AdministratorsModel;
