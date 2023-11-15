import {Box, Button, Paper, Toolbar, Typography} from "@mui/material"
import DadosPessoaFisica from "../DadosPessoaFisica"
import {useContext, useEffect, useState} from "react";
import CampoTexto from "../CampoTexto";
import ModalFeedbackEnvio from "../ModalFeedbackEnvio"
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../commom/context/appContext.jsx";
import {
    alterarPessoaFisica,
    deletarPessoaFisica,
    getPessoaFisicaLogada
} from "../../service/pessoaFisicaService.jsx";

const formataData = (data) => {
    const dataObjeto = new Date(data);

    const ano = dataObjeto.getFullYear();
    const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, "0");
    const dia = (dataObjeto.getDate()).toString().padStart(2, "0");

    return `${ano}-${mes}-${dia}`
}

const PerfilPF = () => {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        codigo: "",
        email: "",
        senha: "",
        isAdmin: "",
        cpf: "",
        nome: "",
        dataDeNascimento: ""
    });

    async function carregaDadosPessoaFisica(){
        const result = await getPessoaFisicaLogada(appContext.setError)
        if(result && result.status === 200)
            setFormValues({
                codigo: result.data.acesso.codigo,
                email: result.data.acesso.email,
                senha: result.data.acesso.senha,
                isAdmin: result.data.acesso.isAdmin,
                cpf: result.data.pessoaFisica.cpf,
                nome: result.data.pessoaFisica.nome,
                dataDeNascimento: formataData(result.data.pessoaFisica.dataNascimento)
            })
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigate(-1)
    };

    const handleSubmit = async (e) => {
        console.log(formValues)
        e.preventDefault();
        const result = await alterarPessoaFisica(formValues, appContext.setError)
        if(result && result.status === 200) {
            handleOpen()
        }
    }

    const handleDelete = async () => {
        const result = await deletarPessoaFisica(formValues?.codigo, appContext.setError)
        if(result && result.status === 200) {
            localStorage.clear()
            navigate('/');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    useEffect(() => {
        carregaDadosPessoaFisica()
    }, []);

    useEffect(() => {
        let timer;
        if (open) {
            timer = setTimeout(() => {
                handleClose();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [open]);

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
                    NomePF={formValues.nome}
                    handleChangeNomePF={handleChange}
                    DataDeNascimento={formValues.dataDeNascimento}
                    handleChangeDataDeNascimento={handleChange}
                />
                {appContext.error && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>{appContext.error.response.data}</Typography>}
                <Box sx={{ width: '76%', display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="submit" variant="contained">Alterar</Button>
                    {!appContext.error && <ModalFeedbackEnvio open={open} handleClose={handleClose} texto='Cadastro atualizado com sucesso!' />}
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

