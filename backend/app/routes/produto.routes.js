module.exports = app =>{
    const produtoController = require("../controllers/produto.controller");
    const authJwt = require("../middlewares/auth_jwt_middleware.js");


    //Rota apra criar um novo registro Produto
    app.post("/produtos", [authJwt.verifyToken, isAdmin], produtoController.create);

    //Buscar todos os registros de Produtos
    app.get("/produtos", produtoController.findAll);

    //Buscar apenas um registro de Produto
    app.get("/produtos/:produtoId", produtoController.findById);

    //Alterar um registro de produto
    app.put("/produtos/:produtoId", [authJwt.verifyToken], produtoController.update);

    //Excluir um registro de produto
    app.delete("/produtos/:produtoId", [authJwt.verifyToken], produtoController.delete);

    //Excluir todos os registros de produto
    app.delete("/produtos", [authJwt.verifyToken], produtoController.deleteAll);
}