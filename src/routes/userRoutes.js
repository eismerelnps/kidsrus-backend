// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/create-user', userController.createUser);

// Ruta para autenticacion de un usuario
router.post('/login', userController.login);

// Ruta para actualizar un usuario por su ID
router.put('/:id',  userController.updateUserById);

module.exports = router;
