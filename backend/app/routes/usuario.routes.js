module.exports = app =>{
    const usuarioController = require("../controllers/usuario.controller.js");

    app.post("/singup", usuarioController.signUp);
    app.post("/singin", usuarioController.signIn);
}