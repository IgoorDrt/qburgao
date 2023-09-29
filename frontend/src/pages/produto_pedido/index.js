import React, {useState, useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { Form, Container } from "./style";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const ProdutoPedido = () =>{
    const { id } = useParams();
    const [observacao, setObservacao] = useState("");
    const [produtos_idprodutos, setprodutos_idprodutos] = useState("");
    const [pedidos_idpedidos, setpedidos_idpedidos] = useState("");

    const [produtos, setTableProdutos] = useState([]);
    const [pedidos, setTablePedidos] = useState([]);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        async function getSelect(){
            try{
                let response = await api.get('/produtos');
                setTableProdutos(response.data);

                response = await api.get('/pedidos');
                setTablePedidos(response.data);
            }catch(err){
                setError("Houve um problema ao carregar os selects: "+err);
            }
        }
        getSelect();

        if(!id) return;

        async function getData(){
            try{
                const { data } = await api.get(`/produtos_pedidos/${id}`);
                setObservacao(data.observacao);
                setprodutos_idprodutos(data.produtos_idprodutos);
                setpedidos_idpedidos(data.pedidos_idpedidos);
            }catch(err){
                setError("Houve um problema ao carregar os dados do produto: "+err);
            }

        }
        getData();
    }, [id]);

    const handleProduto = async e =>{
        e.preventDefault();
        if(!observacao || !produtos_idprodutos || !pedidos_idpedidos){
            setError("Preencha todos os dados para continuar");
            return;
        }else{
            try{
                if(!id){
                    await api.post("/produtos_pedidos", {observacao, produtos_idprodutos, pedidos_idpedidos});
                } else{
                    await api.put(`/produtos_pedidos/${id}`, {observacao, produtos_idprodutos, pedidos_idpedidos});
                }
                navigate("/ListaProdPed");
        } catch (err){
            console.log(err);
            setError("Houve um problema com o cadastro do pedido do produto, verifique suas credenciais!!");
        }
    }
}
return (
    <div>
        <Navbar/>
        <Container>
            <Form onSubmit={handleProduto}>
            <img src={Logo} alt="logo_senac"/>
                
                <input
                value={observacao}
                type="text"
                placeholder='Observação'
                onChange={e=>setObservacao(e.target.value)}
                />
                <select onChange={e =>setpedidos_idpedidos(e.target.value)} value={pedidos_idpedidos}>
                    <option value="">Selecione um Pedido</option>
                    {pedidos.map(pedido => (
                        <option key={pedido.idpedidos} value={pedido.idpedidos}>
                            {pedido.idpedidos}
                        </option>
                    ))}
                </select>
                
                <select onChange={e =>setprodutos_idprodutos(e.target.value)} value={produtos_idprodutos}>
                    <option value="">Selecione um Produto</option>
                    {produtos.map(produto => (
                        <option key={produto.idprodutos} value={produto.idprodutos}>
                            {produto.idprodutos}
                        </option>
                    ))}
                </select>
                <button type="submit">Cadastrar Pedido do Produto</button>
                {error && <p>{error}</p>}

            </Form>
        </Container>
    </div>
);
}
export default ProdutoPedido;