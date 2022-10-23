const mongoose = require("mongoose");

const LikesSchemas = new mongoose.Schema(
  {
  id_Publicacion: {type: mongoose.Types.ObjectId , trim: true, required: true},
  id_Usuario: {type: mongoose.Types.ObjectId, trim: true, required: false},
  Usuario: {type: String, trim: true, required: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Likes", LikesSchemas, "Likes");