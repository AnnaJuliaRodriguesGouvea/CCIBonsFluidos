import DataTableDoacao from "../../componentes/DataTableDoacao"
import { Box, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import {Link, useNavigate} from "react-router-dom";
import {DadosParametrizacaoProvider} from "../../commom/context/dadosParametrizacao.jsx";
import {useEffect} from "react";

const LinkEstilizado = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  &:visited {
    color: rgba(0, 0, 0, 0.7);
  }
`

const Doacao = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate(-1)
        }
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
            <DadosParametrizacaoProvider>
                <DataTableDoacao/>
            </DadosParametrizacaoProvider>
        </Box>
    )
}

export default Doacao