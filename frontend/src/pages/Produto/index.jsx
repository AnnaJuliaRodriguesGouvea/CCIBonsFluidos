import { Box, Button, ButtonGroup, InputBase, Paper, Table, TableContainer } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Link } from "react-router-dom";
import DataTableProduto from "../../componentes/DataTableProduto";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
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

    async function carregaIsAdmin() {
        setIsAdmin(await getIsAdmin(appContext.setError))
    }

    useEffect(() => {
        carregaIsAdmin()
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