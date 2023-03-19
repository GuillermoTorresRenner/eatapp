import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: { type: String },
  avatar: { type: String },
  identidad: {
    nombre: {
      type: String,
      required: [true, "Nombre de personaje obligatorio"],
    },

    descripcion: { type: String },
  },
  aspectos: {
    principal: { type: String },
    complicacion: { type: String },
    aspecto1: { type: String },
    aspecto2: { type: String },
    aspecto3: { type: String },
  },
  fate: {
    puntos: { type: Number, default: 3 },
    recuperacion: { type: Number, default: 3 },
  },
  estilos: {
    cauto: { type: Number, default: 0 },
    furtivo: { type: Number, default: 0 },
    ingenioso: { type: Number, default: 0 },
    llamativo: { type: Number, default: 0 },
    rapido: { type: Number, default: 0 },
    vigoroso: { type: Number, default: 0 },
  },
  proezas: {
    proeza1: { type: String },
    proeza2: { type: String },
    proeza3: { type: String },
    proeza4: { type: String },
    proeza5: { type: String },
  },
  stress: {
    stress1: { type: Boolean, default: false },
    stress2: { type: Boolean, default: false },
    stress3: { type: Boolean, default: false },
  },
  consecuencias: {
    consecuencia2: {
      consecuencia2: { type: Boolean, default: false },
      descripcion: { type: String },
    },
    consecuencia4: {
      consecuencia4: { type: Boolean, default: false },
      descripcion: { type: String },
    },
    consecuencia6: {
      consecuencia6: { type: Boolean, default: false },
      descripcion: { type: String },
    },
  },
});

// Convertir a un modelo
const CharacterModel = mongoose.model("characters", schema);

export default CharacterModel;
