import { useState } from "react"
import styled from "styled-components"
import ContainerForm from "../../componentes/ContainerForm"
import DadosPessoaFisica from "../../componentes/DadosPessoaFisica"
import DadosPessoaJuridica from "../../componentes/DadosPessoaJuridica"
import CampoTexto from "../../componentes/CampoTexto"
import RadioButton from "../../componentes/RadioButton"
import Checkbox from "../../componentes/Checkbox"
import FormBT from "../../componentes/FormBT"
import axios from "axios"
import { Typography } from "@mui/material"
import ModalFeedbackEnvio from "../../componentes/ModalFeedbackEnvio"
import { formataData } from "../../utils/formataData"

const DivOpcoes = styled.div`
    width: 75%;

    display: flex;
`

const DivRadioButtons = styled.div`
    width: 75%;

    display: flex;
    justify-content: end;
    gap: 10px;
`

const Cadastro = ({ isAdmin }) => {

    const [entidade, setEntidade] = useState('pf');
    const [erro, setErro] = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (entidade === 'pf') {
            if (formValues.admin) {
                try {
                    await axios.post('http://localhost:3000/api/pessoa-fisica/admin', {
                        email: formValues.email,
                        senha: formValues.senha,
                        cpf: formValues.CPF,
                        nome: formValues.nomePF,
                        dataNascimento: formataData(formValues.dataDeNascimento)
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        }
                    })
                    handleOpen()
                    setErro(null)
                } catch (err) {
                    setErro(err)
                }

            } else {
                try {
                    await axios.post('http://localhost:3000/api/pessoa-fisica', {
                        email: formValues.email,
                        senha: formValues.senha,
                        cpf: formValues.CPF,
                        nome: formValues.nomePF,
                        dataNascimento: formataData(formValues.dataDeNascimento)
                    })
                    handleOpen()
                    setErro(null)
                } catch (err) {
                    setErro(err)
                }
            }
        } else {
            if (formValues.admin) {
                try {
                    await axios.post('http://localhost:3000/api/pessoa-juridica/admin', {
                        email: formValues.email,
                        senha: formValues.senha,
                        cnpj: formValues.CNPJ,
                        razaoSocial: formValues.razaoSocial
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        }
                    })
                    handleOpen()
                    setErro(null)
                } catch (err) {
                    setErro(err)
                }
            } else {
                try {
                    await axios.post('http://localhost:3000/api/pessoa-juridica', {
                        email: formValues.email,
                        senha: formValues.senha,
                        cnpj: formValues.CNPJ,
                        razaoSocial: formValues.razaoSocial
                    })
                    handleOpen()
                    setErro(null)
                } catch (err) {
                    setErro(err)
                }
            }
        }
    }

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormValues({
                ...formValues,
                [name]: checked,
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    return (
        <>
            <ContainerForm $altura='820px' $largura='100%' botaoVoltar={true} handleSubmit={handleSubmit}>
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
                            valorSelecionado={entidade}
                            valorEsperado="pf"
                            onchange={setEntidade}
                            valor="pf"
                            nome="entidade"
                        />
                        <RadioButton
                            label="Pessoa Jurídica:"
                            valorSelecionado={entidade}
                            valorEsperado="pj"
                            onchange={setEntidade}
                            valor="pj"
                            nome="entidade"
                        />
                    </DivRadioButtons>
                </DivOpcoes>
                {entidade === 'pf' ? <DadosPessoaFisica
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
                    />}
                {erro && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>{erro.message}</Typography>}
                <FormBT>Cadastrar</FormBT>
                {/*TODO - Após exibir o modal depois de 5seg voltar para pagina anterior de adicionar ou alterar - Lemersom*/}
                {!erro && <ModalFeedbackEnvio open={open} handleClose={handleClose} texto='Cadastro realizado com sucesso!' />}
            </ContainerForm>
        </>
    )
}

export default Cadastro