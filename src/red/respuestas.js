exports.success = function (res, message, status){
    const statusCode = status || 200;
    const mensajeOk = message || '';
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: message
    });
}

exports.error = function (res, message, status){
    const statusCode = status || 500;
    const mensajeError = message || 'Error interno';
    res.status(status).send({
        error: true,
        status: statusCode,
        body: messageError
    });
}