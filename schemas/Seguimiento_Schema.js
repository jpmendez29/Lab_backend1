const mongoose = require("mongoose");

const SeguiminetosSchema = new mongoose.Schema(
  {
  id_usuario_seguidor: {type: mongoose.Types.ObjectId, trim: true, required: false},
  Usuario_seguidor: {type: String, trim: true, required: true},
  id_usuario_seguido: {type: mongoose.Types.ObjectId, trim: true, required: false},
  Usuario_seguido: {type: String, trim: true, required: true},
  },
  {
  timestamps: true,
  }
);
   
module.exports = mongoose.model("Seguimientos", SeguiminetosSchema, "Seguimientos");
