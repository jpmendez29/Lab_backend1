const mongoose = require("mongoose");

const PublicacionesSchema = new mongoose.Schema(
  {
  id_Usuario: {type: mongoose.Types.ObjectId, trim: true, required: false},
  Usuario: {type: String, trim: true, required: true},
  Titulo : {type: String, trim: true, required: true},
  Publicacion: {type: String, trim: true, required: true},
  Likes: {type: Number, required: false, default: 0},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Publicaciones", PublicacionesSchema, "Publicaciones");