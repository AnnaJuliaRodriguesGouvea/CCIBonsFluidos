import { Box, Button, Paper, Toolbar, Typography } from "@mui/material"
import {useContext, useEffect, useState} from "react";
import CampoTexto from "../CampoTexto";
import ModalFeedbackEnvio from "../ModalFeedbackEnvio"
import { useNavigate } from "react-router-dom";
import DadosPessoaJuridica from "../DadosPessoaJuridica";
import {AppContext} from "../../commom/context/appContext.jsx";
import {
    alterarPessoaJuridica,
    deletarPessoaJuridica,
    getPessoaJuridicaLogada
} from "../../service/pessoaJuridicaService.jsx";
import {getPessoaFisicaLogada} from "../../service/pessoaFisicaService.jsx";

const PerfilPJ = () => {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        codigo: "",
        email:"",
        senha: "",
        isAdmin: "",
        cnpj: "",
        razaoSocial: "",
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigate(-1)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await alterarPessoaJuridica(formValues, appContext.setError)
        if(result && result.status === 200) {
            handleOpen()
        }
    }

    const handleDelete = async () => {
        const result = await deletarPessoaJuridica(formValues?.codigo, appContext.setError)
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

    async function carregaDadosPessoaJuridica(){
        const result = await getPessoaJuridicaLogada(appContext.setError)
        if(result && result.status === 200)
            setFormValues({
                codigo: result.data.acesso.codigo,
                email: result.data.acesso.email,
                senha: result.data.acesso.senha,
                isAdmin: result.data.acesso.isAdmin,
                cnpj: result.data.pessoaJuridica.cnpj,
                razaoSocial: result.data.pessoaJuridica.razaoSocial,
            })
    }

    useEffect(() => {
        carregaDadosPessoaJuridica()
    }, []);

    useEffect(() => {
    }, [formValues]);

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
                    valor={formValues?.email}
                    tipo="email"
                    placeholder="Digite o seu endereço de email"
                    aoAlterar={handleChange}
                />
                <CampoTexto
                    label="Senha"
                    nome="senha"
                    valor={formValues?.senha}
                    tipo="password"
                    placeholder="Digite a sua senha"
                    aoAlterar={handleChange}
                />
                <DadosPessoaJuridica
                    CNPJ={formValues?.cnpj}
                    handleChangeCNPJ={handleChange}
                    razaoSocial={formValues?.razaoSocial}
                    handleChangeRazaoSocial={handleChange}
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

export default PerfilPJ

