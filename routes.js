const express = require('express');
const route = express.Router();

const ctrlHome = require('./src/controllers/ctrlHome');
const ctrlLogin = require('./src/controllers/ctrlLogin');
const ctrlRegister = require('./src/controllers/ctrlRegister');
const ctrlContact = require('./src/controllers/ctrlContact');

const { loginRequired } = require('./src/middlewares/middleware');

// Define as rotas das páginas
route.get('/', ctrlHome.index);

// Rotas de login
route.get('/login/', ctrlLogin.index);
route.post('/login/confirm/', ctrlLogin.confirm);
route.get('/login/logout/', ctrlLogin.logout);

// Rotas de Cadastro
route.get('/register/', ctrlRegister.index);
route.post('/register/confirm/', ctrlRegister.confirm);

// Rotas de Contatos
route.get('/contact/', loginRequired, ctrlContact.index);
route.post('/contact/confirm/', loginRequired, ctrlContact.confirm);
route.get('/contact/:id', loginRequired, ctrlContact.upIndex);
route.post('/contact/update/:id', loginRequired, ctrlContact.update);
route.get('/contact/delete/:id', loginRequired, ctrlContact.delete);

// Exporta a classe com as rotas definidas
module.exports = route;