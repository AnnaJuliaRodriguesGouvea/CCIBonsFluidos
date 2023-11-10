import { Button, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import BotaoEdicaoProduto from "../BotaoEdicaoProduto"
import { useDadosProdutoContext } from "../../commom/context/dadosProduto"

const DataTableProduto = ({ rows, selectMenuItems, isAdmin, page }) => {

    const { deletaProduto } = useDadosProdutoContext();

    const handleDeleteRow = (codigoDoProduto) => {
        deletaProduto(codigoDoProduto, page)
    }

    const rowsNaoExcluidas = rows?.filter(row => !row.isExcluido)

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
                    rowsNaoExcluidas ? rowsNaoExcluidas.map((row) => (
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
                            <TableCell align="right">{selectMenuItems?.tiposAbsorventes.find(opcao => opcao.codigo === row.codigo_tipo_absorvente).valor}</TableCell>
                            <TableCell align="right">{selectMenuItems?.suavidades.find(opcao => opcao.codigo === row.codigo_suavidade).valor}</TableCell>
                            <TableCell align="right">{selectMenuItems?.transacoes.find(opcao => opcao.codigo === row.codigo_fluxo).valor}</TableCell>
                            <TableCell align="right">{selectMenuItems?.tamanhos.find(opcao => opcao.codigo === row.codigo_tamanho).valor}</TableCell>
                            {isAdmin && <TableCell align="right">
                                <BotaoEdicaoProduto dadosProduto={row} selectMenuItems={selectMenuItems} page={page} />
                            </TableCell>}
                            {isAdmin && <TableCell align="right">
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
