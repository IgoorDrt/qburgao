import React, {useState, useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { Form, Container } from "./style";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const CadastrarPedido = () =>{
    const { id } = useParams();
    const [hora, setHora] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        if(!id) return;

        async function getData(){
            try{
                const { data } = await api.get(`/pedidos/${id}`);
                setHora(data.hora);
                setStatus(data.status);

            }catch(err){
                setError("Houve um problema ao carregar os dados do produto: "+err);
            }
        }
        getData();
    }, [id]);

    const handlePedido = async e =>{
        e.preventDefault();
        if(!hora || !status){
            setError("Preencha todos os dados para continuar");
            return;
        }else{
            try{
                if(!id){
                    await api.post("/pedidos", {hora, status});
                } else{
                    await api.put(`/pedidos/${id}`, {hora, status});
                }
                navigate("/ListaPedidos");
        } catch (err){
            console.log(err);
            setError("Houve um problema com o cadastro do pedido, verifique suas credenciais!!");
        }
    }
}
return (
    <div>
    <Navbar/>
        <Container>
            <Form onSubmit={handlePedido}>
            <img src={Logo} alt="logo_senac"/>
                
                <input
                value={hora}
                type="datetime-local"
                placeholder='Hora'
                onChange={e=>setHora(e.target.value)}
                />
                <input
                value={status}
                type="number"
                placeholder='Status'
                onChange={e=>setStatus(e.target.value)}
                />
                <button type="submit">Cadastrar Pedido</button>
                {error && <p>{error}</p>}

            </Form>
        </Container>
    </div>
);
}
export default CadastrarPedido;