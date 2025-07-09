const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user, 
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.error('[db err:]', err);
            setTimeout(conMysql, 200); // Reintentar conexión después de 2 segundos
        } else {
            console.log('Conexión exitosa a la base de datos MySQL')
        }
    });

    conexion.on('error', (err) => {
        console.log('[Error en la conexión a la base de datos:]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql(); // Reconectar si la conexión se pierde
        } else {
            throw err; // Lanzar otros errores
        }
    });
}

conMysql();

function todos(tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ??`, [tabla], (error, results) => {
            return error ? reject(error) : resolve(results);
        });
    });
}

function uno(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ?? WHERE id = ?`, [tabla, id], (error, results) => {
            return error ? reject(error) : resolve(results);
        });
    });
}

function agregar(tabla, datos){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ?? SET ?`, [tabla, datos], (error, result) => {
            return error ? reject(error) : resolve({ id: result.insertId, ...datos });
        });
    });
}

function eliminar(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ?? WHERE id = ?`, [tabla, id], (error, results) => {
            return error ? reject(error) : resolve(results);
        });
    });
}


module.exports = {
    todos, uno, agregar, eliminar
};``