const express = require('express');

const respuestas = require('../../red/respuestas');

const router = express.Router();

router.get('/', function(req, res) {
    respuestas.success(res, 'Lista de clientes obtenida correctamente', 200);
});

module.exports = router;