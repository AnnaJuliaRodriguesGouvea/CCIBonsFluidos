import { Button, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import BotaoEdicaoProduto from "../BotaoEdicaoProduto"
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

const DataTableProduto = ({ rows, page }) => {
    const appContext = useContext(AppContext)
    const {
        listaTiposAbsorventes, setListaTiposAbsorventes,
        listaSuavidades, setListaSuavidades,
        listaFluxos, setListaFluxos,
        listaTamanhos, setListaTamanhos,
    } = useContext(DadosParametrizacao)

    const [listaProdutos, setListaProdutos] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

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
        setListaProdutos(await listarProdutos(10, page, appContext.setError))
    }

    async function carregaIsAdmin() {
        console.log("Entrei")
        setIsAdmin(await getIsAdmin(appContext.setError))
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

    const handleDeleteRow = async (codigoDoProduto) => {
        await deletaProduto(codigoDoProduto, appContext.setError)
    }

    // FEITO - TODO - validar no back a exclusao logica - ANNA
    // const rowsNaoExcluidas = rows?.filter(row => !row.isExcluido)

    return (
        <>

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
                            {/* FEITO - TODO - se exemplo.valor não existir quebra o código - Anna */}
                            <TableCell align="right">{listaTiposAbsorventes?.find(opcao => opcao.codigo === row.codigo_tipo_absorvente)?.valor}</TableCell>
                            <TableCell align="right">{listaSuavidades?.find(opcao => opcao.codigo === row.codigo_suavidade)?.valor}</TableCell>
                            <TableCell align="right">{listaFluxos?.find(opcao => opcao.codigo === row.codigo_fluxo)?.valor}</TableCell>
                            <TableCell align="right">{listaTamanhos?.find(opcao => opcao.codigo === row.codigo_tamanho)?.valor}</TableCell>
                            {/* FEITO - TODO - arrumar o espaçamento dos botoes editar e excluir - Lemersom*/}
                            {isAdmin && <TableCell align="right" sx={{pr: 1}}>
                                <BotaoEdicaoProduto dadosProduto={row} page={page} />
                            </TableCell>}

                            {/*TODO - deletando direto ao clicar no botão, sem popup - Lemersom */}
                            {isAdmin && <TableCell align="left" sx={{pl: 1}}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: 'tomato',
                                        border: '1px solid tomato',
                                        '&:hover': {
                                            color: 'white',
                                            backgroundColor: 'rgba(255, 0, 0)',
                                            border: '1px solid red'
                                        }
                                    }}
                                    onClick={() => handleDeleteRow(row.codigo)}
                                >
                                    X
                                </Button>
                            </TableCell>}
                        </TableRow>
                    )) : <TableRow>
                        <TableCell colSpan={11}>
                            <Typography variant="body2" sx={{ color: 'info.main', textAlign: 'center' }}>Não há produtos cadastrados nesta página</Typography>
                        </TableCell>
                    </TableRow>
                }
            </TableBody>
        </>
    )
}

export default DataTableProduto
