import { Box, Button, Paper, Toolbar, Typography } from "@mui/material"
import DadosPessoaFisica from "../DadosPessoaFisica"
import { useState } from "react";
import CampoTexto from "../CampoTexto";
import { useUserInfoContext } from "../../commom/context/dadosUsuario";
import ModalFeedbackEnvio from "../ModalFeedbackEnvio"
import { useNavigate } from "react-router-dom";

const formataData = (data) => {
    const dataObjeto = new Date(data);

    const ano = dataObjeto.getFullYear();
    const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, "0");
    const dia = (dataObjeto.getDate()).toString().padStart(2, "0");

    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada
}

const PerfilPF = ({ infoPF, isAdmin, setIsAdmin }) => {
    const { alteraPF, deletePF, erro } = useUserInfoContext()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        //TODO - arrumar o alterar para alterar apenas dados de acesso - Anna
        e.preventDefault();
        handleOpen()
        await alteraPF(formValues, infoPF?.pessoaFisica.codigo)
    }

    const handleDelete = async () => {
        await deletePF(infoPF?.pessoaFisica.codigo)
        localStorage.clear()
        setIsAdmin(false)
        navigate('/');
    }

    const [formValues, setFormValues] = useState({
        email: infoPF?.acesso.email,
        senha: infoPF?.acesso.senha,
        cpf: infoPF?.pessoaFisica.cpf,
        isAdmin: isAdmin,
        nomePF: infoPF?.pessoaFisica.nome,
        dataDeNascimento: formataData(infoPF?.pessoaFisica.dataNascimento),
        cnpj: '',
        razaoSocial: '',
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
                <DadosPessoaFisica
                    CPF={formValues.cpf}
                    handleChangeCPF={handleChange}
                    NomePF={formValues.nomePF}
                    handleChangeNomePF={handleChange}
                    DataDeNascimento={formValues.dataDeNascimento}
                    handleChangeDataDeNascimento={handleChange}
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

export default PerfilPF

