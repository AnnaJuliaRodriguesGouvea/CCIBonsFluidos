import { Box, Button, TextField, Modal, Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import ModalFeedbackEnvio from "../ModalFeedbackEnvio";
import {alteraProduto} from "../../service/produtoService.jsx";
import {AppContext} from "../../commom/context/appContext.jsx";
import {DadosParametrizacao} from "../../commom/context/dadosParametrizacao.jsx";
import {getFluxo, getSuavidade, getTamanho, getTiposAbsorvente} from "../../service/parametrizacaoService.jsx";

const ModalEdicaoProduto = ({ dadosProduto, visible, closeModal }) => {
    const appContext = useContext(AppContext)
    const {
        listaTiposAbsorventes, setListaTiposAbsorventes,
        listaSuavidades, setListaSuavidades,
        listaFluxos, setListaFluxos,
        listaTamanhos, setListaTamanhos,
    } = useContext(DadosParametrizacao)

    const [textModal, setTextModal] = useState("")

    async function carregaDadosTipoAbsorvente(){
        setListaTiposAbsorventes(await getTiposAbsorvente(appContext.setError))
    }

    async function carregaDadosSuavidade(){
        setListaSuavidades(await getSuavidade(appContext.setError))
    }

    async function carregaDadosFluxo(){
        setListaFluxos(await getFluxo(appContext.setError))
    }

    async function carregaDadosTamanho(){
        setListaTamanhos(await getTamanho(appContext.setError))
    }

    const [openModalAlert, setOpenModalAlert] = useState(false);
    const handleOpenModalAlert = () => setOpenModalAlert(true);
    const handleCloseModalAlert = () => {
        setOpenModalAlert(false);
        closeModal()
    }

    useEffect(() => {
        let timer;
        if (openModalAlert) {
            timer = setTimeout(() => {
                handleCloseModalAlert();
                closeModal();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [openModalAlert]);

    const [formValues, setFormValues] = useState({
        marca: "",
        nome: "",
        temAba: false,
        ehNoturno: false,
        temEscapeDeUrina: false,
        quantidadeNoPacote: "",
        quantidadeDePacote: "",
        tipoDeAbsorvente: "",
        suavidade: "",
        fluxo: "",
        tamanho: "",
    });

    useEffect(() => {
        carregaDadosTipoAbsorvente()
        carregaDadosSuavidade()
        carregaDadosFluxo()
        carregaDadosTamanho()
    }, [])

    useEffect(() => {
        setFormValues({
            marca: dadosProduto.marca,
            nome: dadosProduto.nome,
            temAba: dadosProduto.temAbas,
            ehNoturno: dadosProduto.isNoturno,
            temEscapeDeUrina: dadosProduto.temEscapeUrina,
            quantidadeNoPacote: dadosProduto.quantidadeNoPacote,
            quantidadeDePacote: dadosProduto.quantidadeDePacote,
            tipoDeAbsorvente: dadosProduto.codigo_tipo_absorvente,
            suavidade: dadosProduto.codigo_suavidade,
            fluxo: dadosProduto.codigo_fluxo,
            tamanho: dadosProduto.codigo_tamanho,
    })
    }, [dadosProduto])

    const handleInputChange = (e) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await alteraProduto(formValues, dadosProduto.codigo, appContext.setError)
        if (result.status == 200) {
            //chama modal
            setTextModal('Produto alterado com sucesso!')
        } else {
            //chama modal com erro
            setTextModal('Erro ao alterar produto!')
        }
        handleOpenModalAlert()
    };

    return (
        <>
            <Modal
                open={visible}
                onClose={closeModal}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '80%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            width: '70%',
                            m: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <Typography variant="h6" component="h2">
                            Editor
                        </Typography>
                        <TextField
                            variant="standard"
                            name="marca"
                            label="Marca"
                            value={formValues.marca}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="standard"
                            name="nome"
                            label="Nome"
                            value={formValues.nome}
                            onChange={handleInputChange}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <FormControlLabel required control={
                                <Checkbox
                                    name="temAba"
                                    checked={formValues.temAba}
                                    onChange={handleInputChange}
                                />
                            }
                                label="Tem aba"
                            />
                            <FormControlLabel required control={
                                <Checkbox
                                    label="Noturno"
                                    name="ehNoturno"
                                    checked={formValues.ehNoturno}
                                    onChange={handleInputChange}
                                />
                            }
                                label="É noturno"
                            />
                            <FormControlLabel required control={
                                <Checkbox
                                    name="temEscapeDeUrina"
                                    checked={formValues.temEscapeDeUrina}
                                    onChange={handleInputChange}
                                />
                            }
                                label="Tem escape de urina"
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextField
                                type="number"
                                label="Quantidade no Pacote"
                                name="quantidadeNoPacote"
                                sx={{ width: '45%' }}
                                value={formValues.quantidadeNoPacote}
                                onChange={handleInputChange}
                            />
                            <TextField
                                type="number"
                                label="Quantidade de Pacote"
                                name="quantidadeDePacote"
                                sx={{ width: '45%' }}
                                value={formValues.quantidadeDePacote}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <FormControl>
                            <InputLabel id="label-tipo-absorvente">Tipo do Absorvente</InputLabel>
                            <Select
                                labelId="label-tipo-absorvente"
                                id="tipoDeAbsorvente"
                                name="tipoDeAbsorvente"
                                label="Tipo do absorvente"
                                value={formValues.tipoDeAbsorvente}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione o tipo do absorvente</MenuItem>
                                {listaTiposAbsorventes?.map(tipoAbsorvente => {
                                    return <MenuItem value={tipoAbsorvente.codigo} key={tipoAbsorvente.codigo}>{tipoAbsorvente.valor}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="label-Suavidade">Suavidade</InputLabel>
                            <Select
                                labelId="label-Suavidade"
                                id="select-Suavidade"
                                name="suavidade"
                                label="Suavidade"
                                value={formValues.suavidade}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione a suavidade</MenuItem>
                                {listaSuavidades?.map(suavidades => {
                                    return <MenuItem value={suavidades.codigo} key={suavidades.codigo}>{suavidades.valor}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="label-Fluxo">Fluxo</InputLabel>
                            <Select
                                labelId="label-Fluxo"
                                id="select-Fluxo"
                                name="fluxo"
                                label="Fluxo"
                                value={formValues.fluxo}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione o fluxo</MenuItem>
                                {listaFluxos?.map(fluxo => {
                                    return <MenuItem value={fluxo.codigo} key={fluxo.codigo}>{fluxo.valor}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="label-Tamanho">Tamanho</InputLabel>
                            <Select
                                labelId="label-Tamanho"
                                id="select-Tamanho"
                                name="tamanho"
                                label="Tamanho"
                                value={formValues.tamanho}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione o tamanho</MenuItem>
                                {listaTamanhos?.map(tamanho => {
                                    return <MenuItem value={tamanho.codigo} key={tamanho.codigo}>{tamanho.valor}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="secondary">
                            Enviar
                        </Button>
                        <ModalFeedbackEnvio open={openModalAlert} handleClose={handleCloseModalAlert} texto={textModal} />
                    </Box>
                </Box>
            </Modal >
        </>
    )
}

export default ModalEdicaoProduto