import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } 
                                                       from 'react-router-dom';
import { isAuthenticated } from "./services/auth";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Usuarios from "./pages/Usuarios";
import Produto from "./pages/produto";
import Pedido from "./pages/pedidos";
import ListaProdutos from "./pages/ListaProdutos";
import ListaPedidos from "./pages/ListaPedidos";
import ProdutoPedido from "./pages/produto_pedido";
import ListaProdPed from "./pages/ListagemProdPed";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";

const LoginPage = () => <Login />;
const SignUpPage = () => <SignUp />;
const UsuariosPage = () => <Usuarios/>
const CadastroProdutoPage = () => <Produto/>
const CadastrarPedidoPage = () => <Pedido/>
const ListaProdutosPage = () => <ListaProdutos/>
const ListaPedidosPage = () => <ListaPedidos/>
const CadastrarProdPedPage = () => <ProdutoPedido/>
const ListaProdPedPage = () => <ListaProdPed/>
const LogoutPage = () => <Logout/>
const NotFoundPage = () => <h1>Page not found.</h1>
const AppPage = () => {
    if (!isAuthenticated()){
        return <Navigate to="/" replace/>
    }
    return<div><Navbar/><h1>Seja Bem vindo</h1></div>
    
}

const Rotas = () => (
    <Router>
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/app' element={<AppPage />} />
            <Route path='/usuarios' element={<UsuariosPage />} />
            <Route path='/CadastroProduto' element={<CadastroProdutoPage />} />
            <Route path='/produtos/:id' element={<CadastroProdutoPage />} />
            <Route path='/pedidos/:id' element={<CadastrarPedidoPage />} />
            <Route path='/produtos_pedidos/:id' element={<CadastrarProdPedPage/>} />
            <Route path='/usuarios/:id' element={<SignUpPage/>} />
            <Route path='/CadastroPedido' element={<CadastrarPedidoPage />} />
            <Route path='/ListaProdutos' element={<ListaProdutosPage />} />
            <Route path='/ListaPedidos' element={<ListaPedidosPage />} />
            <Route path='/CadastroProdPed' element={<CadastrarProdPedPage />} />
            <Route path='/ListaProdPed' element={<ListaProdPedPage />} />
            <Route path='/logout' element={<LogoutPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </Router>    
);

export default Rotas;
