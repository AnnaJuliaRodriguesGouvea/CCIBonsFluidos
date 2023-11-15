import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import ModalFeedbackEnvio from "../../componentes/ModalFeedbackEnvio"
import {AppContext} from "../../commom/context/appContext.jsx";
import {adicionarProduto} from "../../service/produtoService.jsx";
import {DadosParametrizacao} from "../../commom/context/dadosParametrizacao.jsx";
import {
    getFluxo,
    getSuavidade,
    getTamanho,
    getTiposAbsorvente
} from "../../service/parametrizacaoService.jsx";

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#e66465, #9198e5);
    display: fixed;
`

const AdicionaProduto = () => {
    const appContext = useContext(AppContext)
    const {
        listaTiposAbsorventes, setListaTiposAbsorventes,
        listaSuavidades, setListaSuavidades,
        listaFluxos, setListaFluxos,
        listaTamanhos, setListaTamanhos,
    } = useContext(DadosParametrizacao)
    const navigate = useNavigate();

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

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate(-1)
        } else {
            appContext.setError(null)
            carregaDadosTipoAbsorvente()
            carregaDadosSuavidade()
            carregaDadosFluxo()
            carregaDadosTamanho()
        }

    }, [])

    const [formValues, setFormValues] = useState({
        marca: '',
        nome: '',
        temAba: false,
        ehNoturno: false,
        temEscapeDeUrina: false,
        quantidadeNoPacote: '',
        quantidadeDePacote: '',
        tipoDeAbsorvente: '',
        suavidade: '',
        fluxo: '',
        tamanho: '',
    });

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
        try {
            const result = await adicionarProduto(formValues, appContext.setError);
            if(result.status === 201)
                handleOpen()
        } catch (err) {
            alert(err)
        }
    };

    const handleVoltar = () => {
        navigate(-1);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        handleVoltar()
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
        <Div>
            {/*TODO - arrumar o box que nao preenche tudo - Luis*/}
            <Container >
                <CssBaseline />
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            width: '50%',
                            height: '85%',
                            p: 3,
                            pb: 5,
                            m: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '10px',
                            position: "fixed",
                            overflowY: 'auto',
                            scrollbarWidth: 'thin',
                            '&::-webkit-scrollbar': {
                                width: '5px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#b2b2b2',
                            },
                        }}
                    >
                        <Box>
                            <IconButton onClick={handleVoltar}>
                                <ArrowBack />
                            </IconButton>
                        </Box>
                        <Grid
                            sx={{
                                width: '70%',
                                m: '0 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}
                        >
                            <Typography variant="h3" sx={{ textAlign: 'center', mt: 2, mb: 3 }}>
                                Produto
                            </Typography>
                            <TextField
                                variant="standard"
                                name="marca"
                                label="Marca"
                                value={formValues.marca}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                variant="standard"
                                name="nome"
                                label="Nome"
                                value={formValues.nome}
                                onChange={handleInputChange}
                                required
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <FormControlLabel control={
                                    <Checkbox
                                        name="temAba"
                                        checked={formValues.temAba}
                                        onChange={handleInputChange}
                                    />
                                }
                                    label="Tem aba"
                                />
                                <FormControlLabel control={
                                    <Checkbox
                                        label="Noturno"
                                        name="ehNoturno"
                                        checked={formValues.ehNoturno}
                                        onChange={handleInputChange}
                                    />
                                }
                                    label="É noturno"
                                />
                                <FormControlLabel control={
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
                                    required
                                />
                                <TextField
                                    type="number"
                                    label="Quantidade de Pacote"
                                    name="quantidadeDePacote"
                                    sx={{ width: '45%' }}
                                    value={formValues.quantidadeDePacote}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Box>
                            <FormControl required>
                                <InputLabel id="label-tipo-absorvente">Tipo do Absorvente</InputLabel>
                                <Select
                                    labelId="label-tipo-absorvente"
                                    id="tipoDeAbsorvente"
                                    name="tipoDeAbsorvente"
                                    label="Tipo do absorvente"
                                    value={formValues.tipoDeAbsorvente}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="" disabled>Selecione o tipo do absorvente</MenuItem>
                                    {listaTiposAbsorventes?.map(tipoAbsorvente => {
                                        return <MenuItem value={tipoAbsorvente.codigo} key={tipoAbsorvente.codigo}>{tipoAbsorvente.valor}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl required>
                                <InputLabel id="label-Suavidade">Suavidade</InputLabel>
                                <Select
                                    labelId="label-Suavidade"
                                    id="select-Suavidade"
                                    name="suavidade"
                                    label="Suavidade"
                                    value={formValues.suavidade}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="" disabled>Selecione a suavidade</MenuItem>
                                    {listaSuavidades?.map(suavidades => {
                                        return <MenuItem value={suavidades.codigo} key={suavidades.codigo}>{suavidades.valor}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl required>
                                <InputLabel id="label-Fluxo">Fluxo</InputLabel>
                                <Select
                                    labelId="label-Fluxo"
                                    id="select-Fluxo"
                                    name="fluxo"
                                    label="Fluxo"
                                    value={formValues.fluxo}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="" disabled>Selecione o fluxo</MenuItem>
                                    {listaFluxos?.map(fluxo => {
                                        return <MenuItem value={fluxo.codigo} key={fluxo.codigo}>{fluxo.valor}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl required>
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
                            {appContext.error && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>{appContext.error.response.data}</Typography>}
                            <Button type="submit" variant="contained" color="secondary">
                                Enviar
                            </Button>
                            {!appContext.error && <ModalFeedbackEnvio open={open} handleClose={handleClose} texto='Produto adicionado com sucesso!' />}
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </Div>
    )
}

export default AdicionaProduto