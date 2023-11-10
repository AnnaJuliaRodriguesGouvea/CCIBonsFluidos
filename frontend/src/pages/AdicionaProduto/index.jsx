import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDadosProdutoContext } from "../../commom/context/dadosProduto"
import ModalFeedbackEnvio from "../../componentes/ModalFeedbackEnvio"

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#e66465, #9198e5);
    display: fixed;
`

const AdicionaProduto = ({ selectMenuItems }) => {
    const { adicionarProduto, erro, setErro } = useDadosProdutoContext()

    useEffect(() => {
        setErro(null)
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
            await adicionarProduto(formValues);
            handleOpen()
        } catch (err) {
            alert(err)
        }
    };

    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate(-1);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Div>
            <Container >
                <CssBaseline />
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                        height: '90vh',
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
                            position: "fixed"
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
                                    {selectMenuItems?.tiposAbsorventes.map(tipoAbsorvente => {
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
                                    {selectMenuItems?.suavidades.map(suavidades => {
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
                                    {selectMenuItems?.fluxos.map(fluxo => {
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
                                    {selectMenuItems?.tamanhos.map(tamanho => {
                                        return <MenuItem value={tamanho.codigo} key={tamanho.codigo}>{tamanho.valor}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            {erro && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>Todos os campos devem ser preenchidos corretamente!</Typography>}
                            <Button type="submit" variant="contained" color="secondary">
                                Enviar
                            </Button>
                            {!erro && <ModalFeedbackEnvio open={open} handleClose={handleClose} texto='Produto adicionado com sucesso!' />}
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </Div>
    )
}

export default AdicionaProduto