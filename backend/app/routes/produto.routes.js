const { isBalcao, isCozinha } = require("../middlewares/auth_jwt_middleware.js");

module.exports = app =>{
    const produtoController = require("../controllers/produto.controller");
    const authJwt = require("../middlewares/auth_jwt_middleware.js");


    //Rota apra criar um novo registro Produto
    app.post("/produtos", [authJwt.verifyToken, authJwt.isAdmin],produtoController.create);

    //Buscar todos os registros de Produtos
    app.get("/produtos", [authJwt.verifyToken, authJwt.isBalcao], produtoController.findAll);

    //Buscar apenas um registro de Produto
    app.get("/produtos/:produtoId", [authJwt.verifyToken, authJwt.isBalcao, authJwt.isAdmin], produtoController.findById);

    //Alterar um registro de produto
    app.put("/produtos/:produtoId", [authJwt.verifyToken, authJwt.isAdmin], produtoController.update);

    //Excluir um registro de produto
    app.delete("/produtos/:produtoId", [authJwt.verifyToken, authJwt.isAdmin], produtoController.delete);

    //Excluir todos os registros de produto
    app.delete("/produtos", [authJwt.verifyToken, authJwt.isAdmin], produtoController.deleteAll);
}