import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose, FaExclamation} from 'react-icons/fa';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { ProdPedContainer } from "./style";

const ListaProdPed = () => {
    const [produtos_pedidos, setProdutoPedido] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getData(){
            const response = await api.get('/Produtos_pedidos');
            setProdutoPedido(response.data);
        }
        getData();
    }, []);

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) => {
        e.persist();
        let response = '';
        try{
            response = await api.delete(`/produtos_pedidos/${id}`);
            const novosProdPed = [...produtos_pedidos];
            novosProdPed.splice(index, 1);
            setProdutoPedido(novosProdPed);
        }catch(err){
            setError('Houve um problema ao excluir os dados.');
        }
    };

    return(
        <div>
            <Navbar/>
            <h1>Listagem de Pedidos</h1>
            {error && <p>{error}</p>}
            <ProdPedContainer>
                <div>
                    <span>ID</span>
                    <span>Observação</span>
                    <span>Id do produto</span>
                    <span>Id do pedido</span>
                    <span>Editar</span>
                    <span>Excluir</span>
                </div>
                {produtos_pedidos.map((produto_pedido, index) =>(
                    <div key={String(produto_pedido.idprodutos_pedidos)}>
                        <span>{produto_pedido.idprodutos_pedidos}</span>
                        <span>{produto_pedido.observacao}</span>
                        <span>{produto_pedido.produtos_idprodutos}</span>
                        <span>{produto_pedido.pedidos_idpedidos}</span>
                        <Link to={`/produtos_pedidos/${produto_pedido.idprodutos_pedidos}`}>
                            <FaEdit size={16}/>
                        </Link>
                        <Link onClick={handleDeleteAsk} to={`/produtos_pedidos/${produto_pedido.idprodutos_pedidos}`}>
                            <FaWindowClose size={16}/>
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="pointer"
                            onClick={(e) => handleDelete(e, produto_pedido.idprodutos_pedidos, index)}
                        />
                    </div>
                ))}
            </ProdPedContainer>
        </div>
    );
};

export default ListaProdPed;