module.exports = app =>{
    const pedidoController = require("../controllers/pedido.controller");

    //Rota apra criar um novo registro Pedido
    app.post("/pedidos", pedidoController.create);

    //Buscar todos os registros de Pedidos
    app.get("/pedidos", pedidoController.findAll);

    //Buscar apenas um registro de Pedido
    app.get("/pedidos/:pedidoId", pedidoController.findById);

    //Alterar um registro de pedido
    app.put("/pedidos/:pedidoId", pedidoController.update);

    //Excluir um registro de pedido
    app.delete("/pedidos/:pedidoId", pedidoController.delete);

    //Excluir todos os registros de pedidos
    app.delete("/pedidos", pedidoController.deleteAll);
}