import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
  adminId: { type: String },
  nombre_master: String,
  nombre: {
    type: String,
    required: [true, "Nombre de la campaña obligatorio"],
  },
  descripcion: { type: String },
  notas: [{ titulo: String, nota: String }],
  jugadores: [
    {
      userId: String,
      characterId: { type: String, default: "Sin personaje deleccionado" },
      joined: { type: Boolean, default: false },
      last_connection: Date,
    },
  ],
});

// Convertir a un modelo
const CampaignModel = mongoose.model("campaigns", schema);

export default CampaignModel;
