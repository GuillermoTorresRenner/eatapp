import mongoose from "mongoose";
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator"); //inclusion del plugin de validación unico

const canteenSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: [true, "Código de comedor obligatorio"],
  },
  name: {
    type: String,

    required: [true, "Nombre de comedor obligatorio"],
  },

  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  state: { type: Boolean, default: true },
});

// Apply the uniqueValidator plugin to userSchema.
canteenSchema.plugin(uniqueValidator, {
  message: "Error, Ya existe un comedor registrado con el Código: {VALUE}.",
});

// Convertir a modelo
const CanteensModel = mongoose.model("canteens", canteenSchema); //El nombre que figura como String en el parámetro es el nombre que tendrá la colección en la DB

export default CanteensModel;
