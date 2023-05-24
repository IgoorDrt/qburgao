module.exports = app =>{
    const produtoController = require("../controllers/produto.controller");

    //Rota apra criar um novo registro Produto
    app.post("/produtos", produtoController.create);

    //Buscar todos os registros de Produtos
    app.get("/produtos", produtoController.findAll);

    //Buscar apenas um registro de Produto
    app.get("/produtos/:produtoId", produtoController.findById);

    //Alterar um registro de produto
    app.put("/produtos/:produtoId", produtoController.update);

    //Excluir um registro de produto
    app.delete("/produtos/:produtoId", produtoController.delete);

    //Excluir todos os registros de produto
    app.delete("/produtos", produtoController.deleteAll);
}