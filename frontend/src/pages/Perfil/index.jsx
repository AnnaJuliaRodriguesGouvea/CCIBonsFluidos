import { Box, Container, Typography } from "@mui/material"
import { useUserInfoContext } from "../../commom/context/dadosUsuario"
import PerfilPF from "../../componentes/PerfilPF";
import PerfilPJ from "../../componentes/PerfilPJ";

const Perfil = ({ entidade, isAdmin, setIsAdmin }) => {
    const { infoPF, infoPJ } = useUserInfoContext();

    if (entidade === "PessoaFisica") {
        return (
            <Container sx={{ height: '98%' }}>
                <PerfilPF infoPF={infoPF} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            </Container >
        )
    } else if (entidade === "PessoaJuridica") {
        return (
            <Container sx={{ height: '80%', width: '70%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <PerfilPJ infoPJ={infoPJ} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
            </Container>
        )
    } else {
        return (
            <Container sx={{ height: '80%', width: '70%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ color: "info.dark" }}>Conta de Administrador . . . </Typography>
                </Box>
            </Container>
        )
    }
}

export default Perfil