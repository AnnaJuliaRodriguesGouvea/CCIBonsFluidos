import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { Autocomplete, Box, Button, Container, CssBaseline, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import ModalFeedbackEnvio from "../../componentes/ModalFeedbackEnvio"
import {listarProdutosComEstoque} from "../../service/produtoService.jsx";
import {AppContext} from "../../commom/context/appContext.jsx";
import {adicionarDoacao} from "../../service/doacaoService.jsx";
import {listarTodasPessoasJuridicas} from "../../service/pessoaJuridicaService.jsx";
import {DadosParametrizacao} from "../../commom/context/dadosParametrizacao.jsx";
import {getTransacao} from "../../service/parametrizacaoService.jsx";

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#e66465, #9198e5);
    display: fixed;
`

const AdicionaDoacao = ({ selectMenuItems }) => {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();
    const {listaTransacoes, setListaTransacoes} = useContext(DadosParametrizacao)
    const [listaProdutos, setListaProdutos] = useState([])
    const [listaPessoaJuridica, setListaPessoaJuridica] = useState([])
    const [openModel, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState({
        data: '',
        quantidade: '',
        codigo_transacao: '',
        codigo_produto: '',
        cnpj_destino: '',
    });

    async function carregaListaDeProdutos(substring, isExit) {
        const result = await listarProdutosComEstoque(substring, isExit, appContext.setError)
        if (result.status === 200) {
            setListaProdutos(result.data)
        }
    }

    async function carregaListaPessoasJuridicas(substring) {
        const result = await listarTodasPessoasJuridicas(substring, appContext.setError)
        if(result.status === 200) {
            setListaPessoaJuridica(result.data)
        }
    }

    async function carregaDadosTransacao(){
        setListaTransacoes(await getTransacao(appContext.setError))
    }

    const clearDadosProdutos = (value) => {
        setFormValues({
            data: formValues.data,
            quantidade: formValues.quantidade,
            codigo_transacao: value,
            codigo_produto: '',
            cnpj_destino: formValues.cnpj_destino,
        })
    }

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

        if(name === "codigo_transacao")
            clearDadosProdutos(value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await adicionarDoacao(formValues, appContext.setError);
            if(result && result.status == 201)
                handleOpenModal()
        } catch (err) {
            alert(err)
        }
    };

    const handleVoltar = () => {
        navigate(-1);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false);
        handleVoltar()
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate(-1)
        } else {
            appContext.setError(null)
            carregaDadosTransacao()
        }
    }, [])

    useEffect(() => {
        let timer;
        if (openModel) {
          timer = setTimeout(() => {
            handleClose();
          }, 1500);
        }
        return () => clearTimeout(timer); 
    }, [openModel]);

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
                            p: 4,
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
                            <Typography variant="h3" sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                                Doação
                            </Typography>
                            <TextField
                                variant="standard"
                                name="data"
                                label="Data"
                                value={formValues.data}
                                type="date"
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                            <TextField
                                variant="standard"
                                name="quantidade"
                                label="Quantidade"
                                value={formValues.quantidade}
                                type="number"
                                onChange={handleInputChange}
                                required
                            />
                            <FormControl required>
                                <InputLabel id="label-Transacao">Transação</InputLabel>
                                <Select
                                    labelId="label-Transacao"
                                    id="select-Transacao"
                                    name="codigo_transacao"
                                    label="Transação"
                                    value={formValues.codigo_transacao}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="" disabled>Selecione uma transação</MenuItem>
                                    {listaTransacoes?.map(transacao => {
                                        return <MenuItem value={transacao.codigo} key={transacao.codigo}>{transacao.valor}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl required>
                                <Autocomplete
                                    id="autocomplete-Produto"
                                    name="codigo_produto"
                                    options={listaProdutos || []}
                                    getOptionLabel={(produto) => produto.nome}
                                    value={formValues.codigo_produto ? listaProdutos.find((produto) => produto.codigo === formValues.codigo_produto) || null : null}
                                    onChange={(event, newValue) => {
                                        handleInputChange({
                                            target: {
                                                name: "codigo_produto",
                                                value: newValue ? newValue.codigo : "",
                                            },
                                        });
                                    }}
                                    onInputChange={async (event, newValue) => {
                                        if(newValue.length > 2)
                                            if(formValues.codigo_transacao == 1)
                                                await carregaListaDeProdutos(newValue, false)
                                            else if(formValues.codigo_transacao == 2)
                                                await carregaListaDeProdutos(newValue, true)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Produto"
                                            required
                                        />
                                    )}
                                    noOptionsText="Nenhum produto encontrado"
                                />
                            </FormControl>
                            <FormControl required>
                                <Autocomplete
                                    id="autocomplete-CNPJ_Destino"
                                    name="cnpj_destino"
                                    options={listaPessoaJuridica || []}
                                    getOptionLabel={(pj) => String(pj.razaoSocial)}
                                    value={formValues.cnpj_destino ? listaPessoaJuridica.find((pj) => pj.codigo === formValues.cnpj_destino) || null : null}
                                    onChange={(event, newValue) => {
                                        handleInputChange({
                                            target: {
                                                name: "cnpj_destino",
                                                value: newValue ? newValue.codigo : "",
                                            },
                                        });
                                    }}
                                    onInputChange={async (event, newValue) => {
                                        if(newValue.length > 2)
                                            await carregaListaPessoasJuridicas(newValue)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Instituição"
                                            required
                                        />
                                    )}
                                    noOptionsText="Nenhuma instituição encontrada"
                                />
                            </FormControl>
                            {appContext.error && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>{appContext.error.response.data}</Typography>}
                            <Button type="submit" variant="contained" color="secondary">
                                Enviar
                            </Button>
                            {!appContext.error && <ModalFeedbackEnvio open={openModel} handleClose={handleClose} texto='Doação adicionada com sucesso!' />}
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </Div>
    )
}

export default AdicionaDoacao