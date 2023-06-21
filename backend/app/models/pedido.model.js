const sql = require("./db.js");
//Construtor
const PedidoModel = function(pedido){
    this.hora = pedido.hora;
    this.status = pedido.status;
}

//Cria novo produto no banco
PedidoModel.create = (pedido, result) => {
    sql.query("Insert into pedidos set?", pedido, (err, res)=>{
        if(err){
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Pedido criado: ", {idpedidos: res.insertId, ...pedido});
        result(null, {idpedidos: res.insertId, ...pedido});
    })
    
};
//Seleciona produto por id
PedidoModel.findById = (pedidoId, result) => {
    sql.query("Select * from pedidos where idpedidos = "+pedidoId, (err, res) =>{
        if (err){
            console.log("Erro: ", err);
            result(null, err);
            return;
        }
        if (res.length){
            console.log("Pedido Encontrado", res[0]);
            result(null,res[0]);
        } else{
            result({type: "not_found"}, null);
            console.log("Pedido não encontado");
        }
    })

};
//Seleciona todos os produtos
PedidoModel.getAll = result => {
    sql.query("SELECT * FROM pedidos", (err, res) =>{
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("Pedido: ", res);
        result(null, res);
    })

};
//Atualizar produto por id
PedidoModel.updateById = (pedidoId, pedido, result) => {
    sql.query("UPDATE pedidos SET hora = ?, status = ? WHERE idpedidos = ?",
    [pedido.hora, pedido.status, pedidoId], (err, res)=>{
        if(err){
            console.log("erro: ", err);
            result(null, err);
        } else if (res.affectedRows == 0){
            result({type: "not_found"}, null);
        } else{
            console.log("Pedido atualizaado: ", {idpedidos: pedidoId, ...pedido});
            result(null, {idpedidos: pedidoId, ...pedido});
        }
    })


};
//Remover produto por id
PedidoModel.remove = (pedidoId, result) => {
    sql.query("DELETE FROM pedidos WHERE idpedidos = ?", pedidoId,(err, res)=>{
        if(err){
            console.log("erro: ", err);
            result(err, null);
        }else if(res.affectedRows == 0){
            result({type: "not_found"}, null);
        }else{
            result(null, res);
        }
    });
};
//Remover todos os produtos
PedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM pedidos", pedidoId,(err, res)=>{
        if(err){
            console.log("erro: ", err);
            result(err, null);
        }else{
            result(null, res);
        }
    });
};

module.exports = PedidoModel;