require('dotenv').config();

const express = require('express');

// Cria o app Express
const app = express();

const mongoose = require('mongoose');

// Estabelece a conexão com o MongoDB
mongoose.connect(process.env.STRCONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Connection established');
        app.emit('ready');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

const { mddCSRF, mddCheckCSRF, mddErrors, mddGlobal } = require('./src/middlewares/middleware');
const { mddHome } = require('./src/middlewares/mddHome');
const { mddLogin } = require('./src/middlewares/mddLogin');
const { mddRegister } = require('./src/middlewares/mddRegister');

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

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

app.use(optSession);
app.use(flash());

app.use(mddGlobal);
app.use(mddErrors);
app.use('/', mddHome);
app.use('/login', mddLogin);
app.use('/register', mddRegister);

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(mddCheckCSRF);
app.use(mddCSRF);

app.use(routes);

// Aguarda a promisse de conexão
app.on('ready', () => {
    // Especificando a porta de escuta do servidor
    app.listen(3001, () => {
        console.log('Acesse -> http://localhost:3001');
        console.log('Servidor executando na porta 3000');
    }); // Porta 3000
});