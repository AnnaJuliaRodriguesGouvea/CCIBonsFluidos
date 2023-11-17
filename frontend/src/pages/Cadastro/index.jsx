import {useContext, useEffect, useState} from "react"
import styled from "styled-components"
import ContainerForm from "../../componentes/ContainerForm"
import DadosPessoaFisica from "../../componentes/DadosPessoaFisica"
import DadosPessoaJuridica from "../../componentes/DadosPessoaJuridica"
import CampoTexto from "../../componentes/CampoTexto"
import RadioButton from "../../componentes/RadioButton"
import Checkbox from "../../componentes/Checkbox"
import FormBT from "../../componentes/FormBT"
import { Typography } from "@mui/material"
import ModalFeedbackEnvio from "../../componentes/ModalFeedbackEnvio"
import {AppContext} from "../../commom/context/appContext.jsx";
import {getIsAdmin} from "../../service/acessoService.jsx";
import { useNavigate } from "react-router-dom"
import {cadastrarPessoaFisica, cadastrarPessoaFisicaAdmin} from "../../service/pessoaFisicaService.jsx";
import {cadastrarPessoaJuridica, cadastrarPessoaJuridicaAdmin} from "../../service/pessoaJuridicaService.jsx";

const DivOpcoes = styled.div`
    width: 75%;

    display: flex;
`

const DivRadioButtons = styled.div`
    width: 75%;

    display: flex;
    justify-content: end;
    gap: 30px;
`

const Cadastro = () => {
    const appContext = useContext(AppContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const [selectedRadioButton, setSelectedRadioButton] = useState('pf');
    const [formValues, setFormValues] = useState({
        email: '',
        senha: '',
        admin: false,
        CPF: '',
        nomePF: '',
        dataDeNascimento: '',
        CNPJ: '',
        razaoSocial: '',
    });

    async function carregaIsAdmin() {
        setIsAdmin(await getIsAdmin(appContext.setError))
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigate(-1)
    };

    useEffect(() => {
        setIsAdmin(false)
        if(localStorage.getItem("token"))
            carregaIsAdmin()
        appContext.setError(null)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let result = null;
        if (selectedRadioButton === 'pf') {
            if (formValues.admin) {
                result = await cadastrarPessoaFisicaAdmin(formValues, appContext.setError)
            } else {
                result = await cadastrarPessoaFisica(formValues, appContext.setError)
            }
        } else {
            if (formValues.admin) {
                result = await cadastrarPessoaJuridicaAdmin(formValues, appContext.setError)
            } else {
                result = await cadastrarPessoaJuridica(formValues, appContext.setError)
            }
        }
        if(result && result.status === 201)
            handleOpen()
    }

    const formatarCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    };

    const formatarCNPJ = (value) => {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormValues({
                ...formValues,
                [name]: checked,
            });
        } else {
            let valorFormatado = value

            if (name === 'CPF') {
                valorFormatado = formatarCPF(value);
            } else if (name === 'CNPJ') {
                valorFormatado = formatarCNPJ(value);
            }

            setFormValues({
                ...formValues,
                [name]: valorFormatado,
            });
        }
    };

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
        <>
            <ContainerForm $altura='630px' $largura='100%' botaoVoltar={true} handleSubmit={handleSubmit}>
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
                <DivOpcoes>
                    {isAdmin && <Checkbox
                        label="Administrador: "
                        nome="admin"
                        checked={formValues.admin}
                        valor="admin"
                        handleCheckboxChange={handleChange}
                    />}
                    <DivRadioButtons>
                        <RadioButton
                            label="Pessoa Física:"
                            valorSelecionado={selectedRadioButton}
                            valorEsperado="pf"
                            onchange={setSelectedRadioButton}
                            valor="pf"
                            nome="tipo-acesso"
                        />
                        <RadioButton
                            label="Pessoa Jurídica:"
                            valorSelecionado={selectedRadioButton}
                            valorEsperado="pj"
                            onchange={setSelectedRadioButton}
                            valor="pj"
                            nome="tipo-acesso"
                        />
                    </DivRadioButtons>
                </DivOpcoes>
                {selectedRadioButton === 'pf' ?
                    <DadosPessoaFisica
                        CPF={formValues.CPF}
                        handleChangeCPF={handleChange}
                        NomePF={formValues.nomePF}
                        handleChangeNomePF={handleChange}
                        DataDeNascimento={formValues.dataDeNascimento}
                        handleChangeDataDeNascimento={handleChange}
                    /> :
                    <DadosPessoaJuridica
                        CNPJ={formValues.CNPJ}
                        handleChangeCNPJ={handleChange}
                        razaoSocial={formValues.razaoSocial}
                        handleChangeRazaoSocial={handleChange}
                    />
                }
                {appContext.error && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>{appContext.error.response.data}</Typography>}
                <FormBT>Cadastrar</FormBT>
                {!appContext.error && <ModalFeedbackEnvio open={open} handleClose={handleClose} texto='Cadastro realizado com sucesso!' />}
            </ContainerForm>
        </>
    )
}

export default Cadastro