import {useContext, useEffect, useState} from "react";
import {getEntidade} from "../../service/acessoService.jsx";
import {AppContext} from "../../commom/context/appContext.jsx";
import PerfilPF from "../../componentes/PerfilPF/index.jsx";
import PerfilPJ from "../../componentes/PerfilPJ/index.jsx";
import {Box, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Perfil = () => {
    const appContext = useContext(AppContext)
    const [entidade, setEntidade] = useState()
    const navigate = useNavigate();

    async function carregaEntidade(){
        const result = await getEntidade(appContext.setError)
        if(result && result.status === 200)
            setEntidade(result.data)
    }

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate(-1)
        } else {
            carregaEntidade()
        }
    }, [])

    useEffect(() => {
    }, [entidade])

    return (
        <Container sx={{ height: '80%', width: '70%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {entidade && entidade === "PessoaFísica" && <PerfilPF/>}
            {entidade && entidade === "PessoaJurídica" && <PerfilPJ/>}
        </Container>
    )
}

export default Perfil