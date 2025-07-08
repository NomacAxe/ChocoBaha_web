const express = require('express');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas.js')

const app = express();

//configure the app
app.set('port', config.app.port);

//routes
app.use('/api/clientes', clientes)

module.exports = app;