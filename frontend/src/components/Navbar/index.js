import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { Nav, NavItems, ToggleButton } from './style';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);

    return (
        <Nav>
            <h1>Meu App</h1>
            <ToggleButton onClick={() => setShowNav(!showNav)}><FaBars/></ToggleButton>
            <NavItems show={showNav}>
                <Link to="/usuarios">Usuários</Link>
                <Link to="/ListaProdutos">Lista de Produtos</Link>
                <Link to="/ListaPedidos">Lista de Pedidos</Link>
                <Link to="/ListaProdPed">Lista de Pedido do Produto</Link>
                <Link to="/CadastroProduto">Cadastro de Produto</Link>
                <Link to="/CadastroPedido">Cadastro de Pedido</Link>
                <Link to="/CadastroProdPed">Cadastro de Pedido do Produto</Link>
                <Link to="/logout">Sair</Link>
            </NavItems>
        </Nav>
    );
};
export default Navbar;