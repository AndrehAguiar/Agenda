const express = require('express');
const ctrlHome = require('./src/controllers/ctrlHome');
const ctrlContact = require('./src/controllers/ctrlContact');

const route = express.Router();

// Define as rotas das páginas
route.get('/', ctrlHome.homePage);
route.post('/', ctrlHome.homePost);

route.get('/contact', ctrlContact.contactPage);
route.post('/contact', ctrlContact.contactPost);

// Exporta a classe com as rotas definidas
module.exports = route;