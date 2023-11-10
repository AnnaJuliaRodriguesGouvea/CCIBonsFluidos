import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ContainerForm from "../../componentes/ContainerForm"
import CampoTexto from "../../componentes/CampoTexto"
import TituloPrincipal from "../../componentes/Titulo"
import FormBT from "../../componentes/FormBT"
import ContainerLinkCadastrar from "../../componentes/ContainerLinkCadastrar"
import { Typography } from "@mui/material"
import { useUserInfoContext } from "../../commom/context/dadosUsuario"

const Login = ({ setIsAdmin, setEntidade }) => {
    const navigate = useNavigate();
    
    const { setInfoPF, setInfoPJ } = useUserInfoContext()
    setInfoPJ(null)
    setInfoPF(null)

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
            localStorage.setItem("codigo", data.codigo)
            setIsAdmin(data.isAdmin)
            setEntidade(data.entidade)
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