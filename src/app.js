const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas.js')
const error = require('./red/errors');

const app = express();

//Middleware
app.use(morgan('dev')); // Log requests to the console
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

//configure the app
app.set('port', config.app.port);

//routes
app.use('/api/clientes', clientes)
app.use(error)

module.exports = app;