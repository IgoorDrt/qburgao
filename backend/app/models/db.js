//Modulo do MYSQL
const mysql = require("mysql");
const dbConfig = require("../configs/db.config.js");

//Cria uma conexao com o BD
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

//Nova conexão com o MYSQL
connection.connect(error=>{
    if (error) throw error;
    console.log("Bnaco de Dados Conectado!");
});
module.exports = connection;