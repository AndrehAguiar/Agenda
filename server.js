require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const csrf = require('csurf');

const { mddCSRF, mddCheckCSRF } = require('./src/middlewares/middleware');
const { mddHome } = require('./src/middlewares/mddHome');
const { mddContact } = require('./src/middlewares/mddContact');

// Cria o app Express
const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const msgFlash = require('connect-flash');

const optSession = session({
    secret: 'QualuerSecret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

// Estabelece a conexão com o MongoDB
mongoose.connect(process.env.STRCONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection established');
        app.emit('ready');
    })
    .catch(e => console.log(e));

app.use(helmet());
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(optSession);
app.use(msgFlash());
app.use(csrf());
app.use(mddCSRF);
app.use(mddCheckCSRF);
app.use('/', mddHome);
app.use('/contact', mddContact);
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Aguarda a promisse de conexão
app.on('ready', () => {
    // Especificando a porta de escuta do servidor
    app.listen(3000, () => {
        console.log('Acesse -> http://localhost:3000');
    }); // Porta 3000
});