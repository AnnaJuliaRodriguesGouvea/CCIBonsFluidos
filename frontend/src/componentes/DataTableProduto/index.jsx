import {
    Button,
    Pagination,
    Paper, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"
import ModalEdicaoProduto from "../ModalEdicaoProduto"
import ModalExcluirProduto from "../ModalExcluirProduto/index.jsx";
import {useContext, useEffect, useState} from "react";
import {DadosParametrizacao} from "../../commom/context/dadosParametrizacao.jsx";
import {
    getFluxo,
    getSuavidade,
    getTamanho,
    getTiposAbsorvente,
    getTransacao
} from "../../service/parametrizacaoService.jsx";
import {AppContext} from "../../commom/context/appContext.jsx";
import {deletaProduto, listarProdutos} from "../../service/produtoService.jsx";
import {getIsAdmin} from "../../service/acessoService.jsx";
import {ModeEdit} from "@mui/icons-material";
import {createPortal} from "react-dom";

const DataTableProduto = () => {
    const appContext = useContext(AppContext)
    const {
        listaTiposAbsorventes, setListaTiposAbsorventes,
        listaSuavidades, setListaSuavidades,
        listaFluxos, setListaFluxos,
        listaTamanhos, setListaTamanhos,
    } = useContext(DadosParametrizacao)

    const [listaProdutos, setListaProdutos] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const [limit, setLimit] = useState(5)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const showModal = (row) => {
        setSelectedRow(row);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

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

    async function carregaProdutos() {
        const result = await listarProdutos(limit, page, appContext.setError)
        if(result.status == 200) {
            setListaProdutos(result.data)
            setPageCount(Math.ceil(result.data.count / limit))
        }
    }

    async function carregaIsAdmin() {
        setIsAdmin(await getIsAdmin(appContext.setError))
    }

    const handleDeleteRow = async (codigoDoProduto) => {
        const result = await deletaProduto(codigoDoProduto, appContext.setError)
        if (result.status == 200)
            carregaProdutos()
    }

    useEffect(() => {
        carregaDadosTipoAbsorvente()
        carregaDadosSuavidade()
        carregaDadosFluxo()
        carregaDadosTamanho()
        carregaIsAdmin()
    }, [])

    useEffect(() => {
        carregaProdutos()
    }, [page])

    useEffect(() => {
        carregaProdutos()
    }, [isModalVisible])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Marca</TableCell>
                            <TableCell align="right">Nome</TableCell>
                            <TableCell align="right">Tem aba</TableCell>
                            <TableCell align="right">É noturno</TableCell>
                            <TableCell align="right">Tem Escape de urina</TableCell>
                            <TableCell align="right">Quantidade no Pacote</TableCell>
                            <TableCell align="right">Quantidade de Pacote</TableCell>
                            <TableCell align="right">Tipo de absorvente</TableCell>
                            <TableCell align="right">Suavidade</TableCell>
                            <TableCell align="right">Fluxo</TableCell>
                            <TableCell align="right">Tamanho</TableCell>
                            <TableCell align="right" />
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            listaProdutos && listaProdutos.rows ? listaProdutos.rows.map((row) => (
                                <>
                                    <TableRow
                                        key={row.codigo}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.marca}
                                        </TableCell>
                                        <TableCell align="right">{row.nome}</TableCell>
                                        <TableCell align="center">{row.temAbas ? "Sim" : "Não"}</TableCell>
                                        <TableCell align="right">{row.isNoturno ? "Sim" : "Não"}</TableCell>
                                        <TableCell align="right">{row.temEscapeUrina ? "Sim" : "Não"}</TableCell>
                                        <TableCell align="center">{row.quantidadeNoPacote}</TableCell>
                                        <TableCell align="center">{row.quantidadeDePacote}</TableCell>
                                        <TableCell align="right">{listaTiposAbsorventes?.find(opcao => opcao.codigo === row.codigo_tipo_absorvente)?.valor}</TableCell>
                                        <TableCell align="right">{listaSuavidades?.find(opcao => opcao.codigo === row.codigo_suavidade)?.valor}</TableCell>
                                        <TableCell align="right">{listaFluxos?.find(opcao => opcao.codigo === row.codigo_fluxo)?.valor}</TableCell>
                                        <TableCell align="right">{listaTamanhos?.find(opcao => opcao.codigo === row.codigo_tamanho)?.valor}</TableCell>

                                        {isAdmin && <TableCell align="right" sx={{pr: 1}}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => showModal(row)}
                                            >
                                                <ModeEdit />
                                            </Button>
                                        </TableCell>}

                                        {/*TODO - deletando direto ao clicar no botão, sem popup - Lemersom */}
                                        {isAdmin && <TableCell align="left" sx={{pl: 1}}>
                                            <Button
                                                onClick={() => handleDeleteRow(row.codigo)}
                                                variant="outlined"
                                                sx={{
                                                    color: 'tomato',
                                                    border: '1px solid tomato',
                                                    '&:hover': {
                                                        color: 'white',
                                                        backgroundColor: 'rgba(255, 0, 0)',
                                                        border: '1px solid red'
                                                    }
                                                }}> X
                                            </Button>
                                        </TableCell>}
                                    </TableRow>
                                </>
                            )) : <TableRow>
                                <TableCell colSpan={11}>
                                    <Typography variant="body2" sx={{ color: 'info.main', textAlign: 'center' }}>Não há produtos cadastrados nesta página</Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedRow && (
                <ModalEdicaoProduto dadosProduto={selectedRow} visible={isModalVisible} closeModal={closeModal} />
            )}
            <Pagination
                sx={{mt: 2,  mx: 'auto'}}
                count={pageCount}
                page={page}
                onChange={(event, newPage) => setPage(newPage)}
                variant="outlined" />
        </>
    )
}

export default DataTableProduto
