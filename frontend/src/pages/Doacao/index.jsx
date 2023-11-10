import { useDadosDoacaoContext } from "../../commom/context/dadosDoacao"
import DataTableDoacao from "../../componentes/DataTableDoacao"
import { Box, Button, ButtonGroup, InputBase, Paper, Table, TableContainer } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";

const LinkEstilizado = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  &:visited {
    color: rgba(0, 0, 0, 0.7);
  }
`

const Doacao = ({ selectMenuItems }) => {
    const { rows, listaDoacoes } = useDadosDoacaoContext()

    const [page, setPage] = useState(1);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    async function carregaListaDeDoacoes(page) {
        return await listaDoacoes(page)
    }

    useEffect(() => {
        carregaListaDeDoacoes(page)
    }, [])

    return (
        <Box sx={{ height: '80%', width: '70%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <LinkEstilizado to='/AdicionaDoacao'>
                    <Button
                        variant="contained"
                    >
                        Adicionar
                    </Button>
                </LinkEstilizado>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <DataTableDoacao doacoes={rows} selectMenuItems={selectMenuItems} />
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

export default Doacao