import {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ContainerForm from "../../componentes/ContainerForm"
import CampoTexto from "../../componentes/CampoTexto"
import TituloPrincipal from "../../componentes/Titulo"
import FormBT from "../../componentes/FormBT"
import ContainerLinkCadastrar from "../../componentes/ContainerLinkCadastrar"
import { Typography } from "@mui/material"
import {AppContext} from "../../commom/context/appContext.jsx";
import {login} from "../../service/autenticacaoService.jsx";


const Login = () => {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();

    const [formValues, setformValues] = useState({
        email: '',
        senha: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await login(formValues, appContext.setError)
        if(result && result.status === 200) {
            localStorage.setItem("token", result.data)
            navigate('/home')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {
        localStorage.clear()
        appContext.setError(null)
    }, []);

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
                {appContext.error &&
                    <Typography
                        variant="body2"
                        sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>
                            {appContext.error.response.data}
                    </Typography>
                }
                <FormBT tipo="submit">Entrar</FormBT>
            </ContainerForm>
            <ContainerLinkCadastrar />
        </>
    )
}

export default Login