import {useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ContainerForm from "../../componentes/ContainerForm"
import CampoTexto from "../../componentes/CampoTexto"
import TituloPrincipal from "../../componentes/Titulo"
import FormBT from "../../componentes/FormBT"
import ContainerLinkCadastrar from "../../componentes/ContainerLinkCadastrar"
import { Typography } from "@mui/material"
import {AppContext} from "../../commom/context/appContext.jsx";

// FEITO - TODO - rodando /install no login - Anna

const Login = () => {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();

    const [formValues, setformValues] = useState({
        email: '',
        senha: ''
    });

    const [erro, setErro] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('http://localhost:3000/login', {
                email: formValues.email,
                senha: formValues.senha
            })

            localStorage.setItem("token", data.token)
            // appContext.setIsAdmin(data.isAdmin)
            setErro(null);
            if (data.token)
                navigate('/home')
        } catch (err) {
            setErro(err)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <>
            <ContainerForm handleSubmit={handleSubmit}>
                <TituloPrincipal>Login</TituloPrincipal>
                <CampoTexto
                    label="Email"
                    nome="email"
                    valor={formValues.email}
                    tipo="email"
                    placeholder="Digite o seu endereço de email"
                    aoAlterar={handleChange}
                    id="email"
                />
                <CampoTexto
                    label="Senha"
                    nome="senha"
                    valor={formValues.senha}
                    tipo="password"
                    placeholder="Digite a sua senha"
                    aoAlterar={handleChange}
                    id="senha"
                />
                {erro && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>Email ou Senha incorretos!</Typography>}
                <FormBT tipo="submit">Entrar</FormBT>
            </ContainerForm>
            <ContainerLinkCadastrar />
        </>
    )
}

export default Login