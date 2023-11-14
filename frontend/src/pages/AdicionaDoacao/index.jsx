import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { Autocomplete, Box, Button, Container, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDadosDoacaoContext } from "../../commom/context/dadosDoacao"
import ModalFeedbackEnvio from "../../componentes/ModalFeedbackEnvio"
import { useDadosPessoaJuridica } from "../../commom/context/dadosPessoaJuridica"
import { listarProdutos } from "../../service/produtoService.jsx";

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#e66465, #9198e5);
    display: fixed;
`

const AdicionaDoacao = ({ selectMenuItems }) => {
    const [rows, setRows] = useState([])
    const { adicionarDoacao, erro, setErro } = useDadosDoacaoContext()
    const { pessoasJuridicas, listaPessoasJuridicas } = useDadosPessoaJuridica()

    useEffect(() => {
        setErro(null)
    }, [])

    async function carregaListaDeProdutos(limit, page) {
        // FEITO - TODO - buscar produto a partir da string digitada pelo usuario:
        // EXE: produto Intimus, usuario digita imus e ele traz todos os produtos com substring imus - Lemersom (apenas o front)
        setRows(await listarProdutos(limit, page).rows)
    }

    async function carregaListaPessoasJuridicas(limit, page) {
        // FEITO - TODO - Arrumar para ao inves de usar cnpj usar nome fantasia e fazer o mesmo comportamento de produtos - Lemersom
        return await listaPessoasJuridicas(limit, page)
    }

    useEffect(() => {
        carregaListaDeProdutos(30, 1)
        carregaListaPessoasJuridicas(30, 1)
    }, [])

    const [formValues, setFormValues] = useState({
        data: '',
        quantidade: '',
        codigo_transacao: '',
        codigo_produto: '',
        cnpj_destino: '',
    });

    const handleInputChange = (e) => {
        //TODO - Criar nova rota no backend para trazer todos os produtos que estoque > 0 e a rota recebe o parametros
        // "apenasNaoExcluidos" - Anna
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
            await adicionarDoacao(formValues);
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
    const handleClose = () => {
        setOpen(false);
        handleVoltar()
    }

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
                                    {selectMenuItems?.transacoes.map(transacao => {
                                        return <MenuItem value={transacao.codigo} key={transacao.codigo}>{transacao.valor}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl required>
                                <Autocomplete
                                    id="autocomplete-Produto"
                                    name="codigo_produto"
                                    options={rows || []}
                                    getOptionLabel={(produto) => produto.nome}
                                    value={formValues.codigo_produto ? rows.find((produto) => produto.codigo === formValues.codigo_produto) || null : null}
                                    onChange={(event, newValue) => {
                                        handleInputChange({
                                            target: {
                                                name: "codigo_produto",
                                                value: newValue ? newValue.codigo : "",
                                            },
                                        });
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
                                    options={pessoasJuridicas || []}
                                    getOptionLabel={(pj) => String(pj.razaoSocial)}
                                    value={formValues.cnpj_destino ? pessoasJuridicas.find((pj) => pj.codigo === formValues.cnpj_destino) || null : null}
                                    onChange={(event, newValue) => {
                                        handleInputChange({
                                            target: {
                                                name: "cnpj_destino",
                                                value: newValue ? newValue.codigo : "",
                                            },
                                        });
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
                            {erro && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', fontWeight: 700 }}>Todos os campos devem ser preenchidos corretamente!</Typography>}
                            <Button type="submit" variant="contained" color="secondary">
                                Enviar
                            </Button>
                            {!erro && <ModalFeedbackEnvio open={open} handleClose={handleClose} texto='Doação adicionada com sucesso!' />}
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </Div>
    )
}

export default AdicionaDoacao