import {
    Button,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"
import ModalDadosProduto from "../ModalDadoProdutos"
import { formataData } from "../../utils/formataData"
import {useContext, useEffect, useState} from "react"
import {AppContext} from "../../commom/context/appContext.jsx";
import {DadosParametrizacao} from "../../commom/context/dadosParametrizacao.jsx";
import {getTransacao} from "../../service/parametrizacaoService.jsx";
import {listarDoacoes} from "../../service/doacaoService.jsx";

const DataTableDoacao = () => {
    const appContext = useContext(AppContext)
    const {listaTransacoes, setListaTransacoes} = useContext(DadosParametrizacao)
    const [listaDoacoes, setListaDoacoes] = useState([])
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

    async function carregaDadosTransacao(){
        setListaTransacoes(await getTransacao(appContext.setError))
    }

    async function carregaDoacoes() {
        const result = await listarDoacoes(limit, page, appContext.setError)
        if (result.status == 200) {
            setListaDoacoes(result.data)
            setPageCount(Math.ceil(result.data.count / limit))
        }
    }

    useEffect(() => {
        carregaDadosTransacao()
    }, [])

    useEffect(() => {
        carregaDoacoes()
    }, [page])

    useEffect(() => {
        carregaDoacoes()
    }, [isModalVisible])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell align="center">Quantidade</TableCell>
                            <TableCell align="center">Transação</TableCell>
                            <TableCell align="center">Produto</TableCell>
                            <TableCell align="center">Instituição</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            listaDoacoes && listaDoacoes.rows ? listaDoacoes.rows.map((row) => (
                                <TableRow
                                    key={row.codigo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {formataData(row.data)}
                                    </TableCell>
                                    <TableCell align="right">{row.quantidade}</TableCell>
                                    <TableCell align="right">{listaTransacoes?.find(opcao => opcao.codigo === row.codigo_transacao).valor}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => showModal(row)}>Produto descrição</Button>
                                    </TableCell>
                                    <TableCell align="right">{row.PessoaJuridica.razaoSocial}</TableCell>
                                </TableRow>
                            )) : <TableRow>
                                <TableCell colSpan={11}>
                                    <Typography variant="body2" sx={{ color: 'info.main', textAlign: 'center' }}>Não há doações cadastradas nesta página</Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedRow && (
                <ModalDadosProduto dadosProduto={selectedRow} visible={isModalVisible} closeModal={closeModal} />
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

export default DataTableDoacao