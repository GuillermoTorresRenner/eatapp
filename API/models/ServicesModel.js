import mongoose from "mongoose";
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator"); //inclusion del plugin de validación unico

const servicesSchema = new Schema({
  serviceName: {
    type: String,
    unique: true,
    required: [true, "Nombre de comedor obligatorio"],
  },

  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  week: {
    monday: { type: Boolean, default: false },
    tuesday: { type: Boolean, default: false },
    wednesday: { type: Boolean, default: false },
    thursday: { type: Boolean, default: false },
    friday: { type: Boolean, default: false },
    saturday: { type: Boolean, default: false },
    sunday: { type: Boolean, default: false },
  },
  state: { type: Boolean, default: true },
});

// Apply the uniqueValidator plugin to userSchema.
servicesSchema.plugin(uniqueValidator, {
  message: "Error, Ya existe un comedor registrado con el Código: {VALUE}.",
});

// Convertir a modelo
const ServicesModel = mongoose.model("canteens", servicesSchema); //El nombre que figura como String en el parámetro es el nombre que tendrá la colección en la DB

export default ServicesModel;
