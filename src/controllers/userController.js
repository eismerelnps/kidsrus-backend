// userController.js

const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Controlador para autenticar un usuario
exports.createUser = async (req, res) => {
  try {
    //for segurtec
    //const { username, password, email, role } = req.body;

    //for kidsrus
    const { role, logged, username, password, email, number, cart, wishList } =
      req.body;
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    //Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea una nueva instancia del modelo User con los datos del usuario
    //for kidsrus
    const newUser = new User({
      role,
      logged,
      username,
      password: hashedPassword,
      email,
      number,
      cart,
      wishList,
    });

    // Guarda el usuario en la base de datos
    await newUser.save();

    // Envía una respuesta con el usuario creado
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

// Función para actualizar un usuario por su ID
exports.updateUserById = async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { role, logged, username, password, email, number, cart, wishList } =
      req.body;

    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un objeto con los datos actualizados del usuario
    const updatedUserData = {
      role,
      logged,
      username,
      password: hashedPassword,
      email,
      number,
      cart,
      wishList,
    };

    // Actualizar el usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedUserData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrecto" });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrecto" });
    }

    if (user.logged) {
      // Si el usuario ya está autenticado, generar un nuevo token JWT y retornarlo con el usuario
      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token, user });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Actualizar el estado de autenticación a true
    user.logged = true;
    await user.save();

    // Enviar el token y el usuario en la respuesta
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error al autenticar el usuario", error });
  }
};
