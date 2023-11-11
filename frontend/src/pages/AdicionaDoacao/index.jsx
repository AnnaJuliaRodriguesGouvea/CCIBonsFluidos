import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Container, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDadosDoacaoContext } from "../../commom/context/dadosDoacao"
import ModalFeedbackEnvio from "../../componentes/ModalFeedbackEnvio"
import { useDadosProdutoContext } from "../../commom/context/dadosProduto"
import { useDadosPessoaJuridica } from "../../commom/context/dadosPessoaJuridica"

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#e66465, #9198e5);
    display: fixed;
`

const AdicionaDoacao = ({ selectMenuItems }) => {

    const { adicionarDoacao, erro, setErro } = useDadosDoacaoContext()
    const { rows, listaProdutos } = useDadosProdutoContext()
    const { pessoasJuridicas, listaPessoasJuridicas } = useDadosPessoaJuridica()

    useEffect(() => {
        setErro(null)
    }, [])

    async function carregaListaDeProdutos(limit, page) {
        //TODO - buscar produto a partir da string digitada pelo usuario: EXE: produto Intimus, usuario digita imus e ele traz todos os produtos com substring imus
        return await listaProdutos(limit, page)
    }

    async function carregaListaPessoasJuridicas(limit, page) {
        //TODO - Arrumar para ao inves de usar cnpj usar nome fantasia e fazer o mesmo comportamento de produtos
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
        codigo_acesso: parseInt(localStorage.getItem("codigo")),
        cnpj_destino: '',
    });

    const handleInputChange = (e) => {
        //TODO - Criar nova rota no backend para trazer todos os produtos que estoque > 0 e a rota recebe o parametros
        // "apenasNaoExcluidos"
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
                                <InputLabel id="label-Produto">Produto</InputLabel>
                                <Select
                                    labelId="label-Produto"
                                    id="select-Produto"
                                    name="codigo_produto"
                                    label="Produto"
                                    value={formValues.codigo_produto}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="" disabled>Selecione um produto</MenuItem>
                                    {
                                        rows ? rows.map(produto => <MenuItem value={produto.codigo} key={produto.codigo}>{produto.nome}</MenuItem>) : <MenuItem value="" key="" disabled>Não há produtos cadastrados</MenuItem>

                                    }
                                </Select>
                            </FormControl>
                            <FormControl required>
                                <InputLabel id="label-CNPJ_Destino">CNPJ de Destino</InputLabel>
                                <Select
                                    labelId="label-CNPJ_Destino"
                                    id="select-CNPJ_Destino"
                                    name="cnpj_destino"
                                    label="CNPJ de Destino"
                                    value={formValues.cnpj_destino}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="" disabled>Selecione um CNPJ</MenuItem>
                                    {
                                        pessoasJuridicas ? pessoasJuridicas.map(pj => <MenuItem value={pj.codigo} key={pj.codigo}>{String(pj.cnpj)}</MenuItem>) : <MenuItem value="" key="" disabled>Não há pessoas juridicas cadastradas</MenuItem>
                                    }
                                </Select>
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