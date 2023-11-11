import { Box, Button, Paper, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import CampoTexto from "../CampoTexto";
import { useUserInfoContext } from "../../commom/context/dadosUsuario";
import ModalFeedbackEnvio from "../ModalFeedbackEnvio"
import { useNavigate } from "react-router-dom";
import DadosPessoaJuridica from "../DadosPessoaJuridica";

const PerfilPJ = ({ infoPJ, isAdmin, setIsAdmin }) => {
    const { alteraPJ, deletePJ, erro } = useUserInfoContext()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        //TODO - arrumar o alterar para alterar apenas dados de acesso
        e.preventDefault();
        handleOpen()
        await alteraPJ(formValues, infoPJ?.pessoaJuridica.codigo)
    }

    const handleDelete = async () => {
        await deletePJ(infoPJ?.pessoaJuridica.codigo)
        localStorage.clear()
        setIsAdmin(false)
        navigate('/');
    }

    const [formValues, setFormValues] = useState({
        email: infoPJ?.acesso.email,
        senha: infoPJ?.acesso.senha,
        cpf: '',
        isAdmin: isAdmin,
        nomePF: '',
        dataDeNascimento: '',
        cnpj: infoPJ.pessoaJuridica.cnpj,
        razaoSocial: infoPJ.pessoaJuridica.razaoSocial,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box
            sx={{
                height: '100%',
                width: '70%',
                mx: 'auto',
                mt: 5,
            }}
            component="form"
            noValidate
            onSubmit={handleSubmit}
        >
            <Paper sx={{
                height: '100%',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <Toolbar />
                <CampoTexto
                    label="Email"
                    nome="email"
                    valor={formValues.email}
                    tipo="email"
                    placeholder="Digite o seu endereço de email"
                    aoAlterar={handleChange}
                />
                <CampoTexto
                    label="Senha"
                    nome="senha"
                    valor={formValues.senha}
                    tipo="password"
                    placeholder="Digite a sua senha"
                    aoAlterar={handleChange}
                />
                <DadosPessoaJuridica
                    CNPJ={formValues.cnpj}
                    handleChangeCNPJ={handleChange}
                    razaoSocial={formValues.razaoSocial}
                    handleChangeRazaoSocial={handleChange}
                />
                {erro && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>{erro.message}</Typography>}
                <Box sx={{ width: '76%', display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="submit" variant="contained">Alterar</Button>
                    {!erro && <ModalFeedbackEnvio open={open} handleClose={handleClose} texto='Cadastro atualizado com sucesso!' />}
                    <Button variant="contained" sx={{
                        color: '#FFF',
                        backgroundColor: 'error.light',
                        '&: hover': {
                            backgroundColor: 'error.main',
                        }
                    }}
                        onClick={handleDelete}
                    >
                        Excluir
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default PerfilPJ

