const respuestas = require('./respuestas');

function error(req, res, err, next) {
    console.error('[Error]:', err);

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    respuestas.error(req, res, message, status);
}

module.exports = error;