const mongoose = require("mongoose");

const UsuariosSchema = new mongoose.Schema(
  {
  Usuario: {type: String, trim: true, required: true, unique: true, unique: true},
  Correo: {type: String, trim: true, required: true, unique: true},
  Contraseña: {type: String, trim: true, required: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuarios", UsuariosSchema, "Usuarios");
