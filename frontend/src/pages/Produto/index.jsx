import { useDadosProdutoContext } from "../../commom/context/dadosProduto"
import { Box, Button, ButtonGroup, InputBase, Paper, Table, TableContainer } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Link } from "react-router-dom";
import DataTableProduto from "../../componentes/DataTableProduto";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";

const LinkEstilizado = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  &:visited {
    color: rgba(0, 0, 0, 0.7);
  }
`

const Produto = ({ selectMenuItems, isAdmin }) => {
    const { rows, listaProdutos } = useDadosProdutoContext()

    const [page, setPage] = useState(1);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        //TODO - fazer verificacao do count se page nao é > que count/5
        //TODO - validar se count retorna o total no banco ou total da consulta
        setPage(page + 1);
    };

    async function carregaListaDeProdutos(limit, page) {
        return await listaProdutos(limit, page)
    }

    useEffect(() => {
        carregaListaDeProdutos(5, page)
    }, [page])

    return (
        <Box sx={{ height: '80%', width: '95%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <LinkEstilizado to='/AdicionaProduto'>
                    {isAdmin && <Button variant="contained"> Adicionar </Button>}
                </LinkEstilizado>
            </Box>
            {/*TODO - arrumar organização das colunas*/}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <DataTableProduto rows={rows} selectMenuItems={selectMenuItems} isAdmin={isAdmin} page={page} />
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