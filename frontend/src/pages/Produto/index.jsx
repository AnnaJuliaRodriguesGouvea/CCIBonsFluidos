import { Box, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import {Link, useNavigate} from "react-router-dom";
import DataTableProduto from "../../componentes/DataTableProduto";
import {useContext, useEffect, useState} from "react";
import {DadosParametrizacaoProvider} from "../../commom/context/dadosParametrizacao.jsx";
import {AppContext} from "../../commom/context/appContext.jsx";
import {getIsAdmin} from "../../service/acessoService.jsx";

const LinkEstilizado = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  &:visited {
    color: rgba(0, 0, 0, 0.7);
  }
`

const Produto = () => {
    const appContext = useContext(AppContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate();

    async function carregaIsAdmin() {
        setIsAdmin(await getIsAdmin(appContext.setError))
    }

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate(-1)
        } else {
            carregaIsAdmin()
        }
    }, [])

    return (
        <Box sx={{ height: '80%', width: '95%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <LinkEstilizado to='/adicionaProduto'>
                    {isAdmin && <Button variant="contained"> Adicionar </Button>}
                </LinkEstilizado>
            </Box>
            {/* TODO - arrumar organização das colunas - Lemersom*/}
            <DadosParametrizacaoProvider>
                <DataTableProduto/>
            </DadosParametrizacaoProvider>
        </Box>
    )
}

export default Produto