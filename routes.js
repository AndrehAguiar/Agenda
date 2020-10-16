const express = require('express');
const route = express.Router();

const ctrlHome = require('./src/controllers/ctrlHome');
const ctrlLogin = require('./src/controllers/ctrlLogin');
const ctrlRegister = require('./src/controllers/ctrlRegister');

// Define as rotas das páginas
route.get('/', ctrlHome.index);

// Rotas de login
route.get('/login/', ctrlLogin.index);
route.post('/login/confirm/', ctrlLogin.confirm);
route.get('/login/logout/', ctrlLogin.logout);

// Rotas de Cadastro
route.get('/register/', ctrlRegister.index);
route.post('/register/confirm/', ctrlRegister.confirm);

// Exporta a classe com as rotas definidas
module.exports = route;