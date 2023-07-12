const mongoose = require("mongoose");

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'user',
  },
  logged: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"], // Campo obligatorio
    unique: true, // El nombre de usuario debe ser único
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"], // Campo obligatorio
  },
  email: {
    type: String,
    required: false, // Campo opcional
  },
  number: {
    type: String,
    required: true,
    unique: true, // El numero movil de usuario debe ser único
  },
  cart: {
    type:  Object,
    required: false,
  },
  wishList: {
    type: Object,
    required: false,
  }


  //for kidsrus

});

// Creación del modelo User basado en el esquema
const User = mongoose.model("User", userSchema);

module.exports = User;
