const sql = require("./db.js");
//Construtor
const ProdutoPedidoModel = function(produtoPedido){
    this.observacao = produtoPedido.observacao;
    this.produtos_idprodutos = produtoPedido.produtos_idprodutos;
    this.pedidos_idpedidos = produtoPedido.pedidos_idpedidos;
}

//Cria novo produto no banco
ProdutoPedidoModel.create = (produtoPedido, result) => {
    sql.query("Insert into produtos_pedidos set?", produtoPedido, (err, res)=>{
        if(err){
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Pedido do Porduto criado: ", {idprodutos_pedidos: res.insertId, ...produtoPedido});
        result(null, {idprodutos_pedidos: res.insertId, ...produtoPedido});
    })
    
};
//Seleciona produto por id
ProdutoPedidoModel.findById = (produtoPedidoId, result) => {
    sql.query("Select * from produtos_pedidos where idprodutos_pedidos = "+produtoPedidoId, (err, res) =>{
        if (err){
            console.log("Erro: ", err);
            result(null, err);
            return;
        }
        if (res.length){
            console.log("Pedido do Produto Encontrado", res[0]);
            result(null,res[0]);
        } else{
            result({type: "not_found"}, null);
            console.log("Pedido do produto não encontado");
        }
    })

};

ProdutoPedidoModel.findByProduto = (produtoPedidoId, result) => {
    sql.query("Select * from produtos_pedidos where produtos_idprodutos = "+produtoPedidoId, (err, res) =>{
        if (err){
            console.log("Erro: ", err);
            result(null, err);
            return;
        }
        if (res.length){
            console.log("Produto Encontrado", res[0]);
            result(null,res[0]);
        } else{
            result({type: "not_found"}, null);
            console.log("Produto não encontado");
        }
    })

};

ProdutoPedidoModel.findByPedido = (produtoPedidoId, result) => {
    sql.query("Select * from produtos_pedidos where pedidos_idpedidos = "+produtoPedidoId, (err, res) =>{
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
ProdutoPedidoModel.getAll = result => {
    sql.query("SELECT * FROM produtos_pedidos", (err, res) =>{
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("Pedido do Produto: ", res);
        result(null, res);
    })

};
//Atualizar produto por id
ProdutoPedidoModel.updateById = (produtoPedidoId, produtoPedido, result) => {
    sql.query("UPDATE produtos_pedidos SET observacao = ?, produtos_idprodutos = ?, pedidos_idpedidos = ? WHERE idprodutos_pedidos = ?",
    [produtoPedido.observacao, produtoPedido.produtos_idprodutos, produtoPedido.pedidos_idpedidos,produtoPedidoId], (err, res)=>{
        if(err){
            console.log("erro: ", err);
            result(null, err);
        } else if (res.affectedRows == 0){
            result({type: "not_found"}, null);
        } else{
            console.log("Pedido do Produto atualizaado: ", {idprodutos_pedidos: produtoPedidoId, ...produtoPedido});
            result(null, {idprodutos_pedidos: produtoPedidoId, ...produtoPedido});
        }
    })


};
//Remover produto por id
ProdutoPedidoModel.remove = (produtoPedidoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE idprodutos_pedidos = ?", produtoPedidoId,(err, res)=>{
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

ProdutoPedidoModel.removeByPedido = (produtoPedidoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE pedidos_idpedidos = ?", produtoPedidoId,(err, res)=>{
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

ProdutoPedidoModel.removeByProduto = (produtoPedidoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE produtos_idprodutos = ?", produtoPedidoId,(err, res)=>{
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
ProdutoPedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM produtos_pedidos", produtoPedidoId,(err, res)=>{
        if(err){
            console.log("erro: ", err);
            result(err, null);
        }else{
            result(null, res);
        }
    });
};

module.exports = ProdutoPedidoModel;