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
    const [page, setPage] = useState(1);

    async function carregaIsAdmin() {
        setIsAdmin(await getIsAdmin(appContext.setError))
    }

    useEffect(() => {
        carregaIsAdmin()
    }, [])

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        //TODO - fazer verificacao do count se page nao é > que count/5 - Anna
        //TODO - validar se count retorna o total no banco ou total da consulta - Anna
        setPage(page + 1);
    };


    return (
        <Box sx={{ height: '80%', width: '95%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <LinkEstilizado to='/adicionaProduto'>
                    {isAdmin && <Button variant="contained"> Adicionar </Button>}
                </LinkEstilizado>
            </Box>
            {/* TODO - arrumar organização das colunas - Lemersom*/}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <DadosParametrizacaoProvider>
                        <DataTableProduto page={page} />
                    </DadosParametrizacaoProvider>
                </Table>
            </TableContainer>
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                sx={{
                    mt: 2,
                    mx: 'auto',
                    borderColor: '#000',
                }}
            >
                <Button sx={{
                    borderRadius: '0 0 0 5px',
                    px: 3,
                    py: 1.5,
                    backgroundColor: '#fff',
                    color: '#1f1f1f',
                    border: '1px solid #242424',
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    },
                    '&.MuiButtonGroup-firstButton': {
                        borderColor: '#242424'
                    },
                }} onClick={handlePreviousPage}>
                    <ArrowBackIos />
                </Button>
                <Button sx={{
                    borderRadius: '0 0 5px 0',
                    p: 3,
                    py: 1.5,
                    backgroundColor: '#fff',
                    color: '#1f1f1f',
                    border: '1px solid #242424',
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    },
                    '&.MuiButtonGroup-firstButton': {
                        borderColor: '#242424'
                    },
                }} onClick={handleNextPage}>
                    <ArrowForwardIos />
                </Button>
            </ButtonGroup>
        </Box>
    )
}

export default Produto