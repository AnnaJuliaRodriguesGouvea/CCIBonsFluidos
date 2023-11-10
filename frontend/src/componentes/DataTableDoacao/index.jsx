import { TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import BotaoDadoProduto from "../BotaoDadoProdutos"
import { formataData } from "../../utils/formataData"
import { useEffect } from "react"
import { useDadosPessoaJuridica } from "../../commom/context/dadosPessoaJuridica"

const DataTableDoacao = ({ doacoes, selectMenuItems }) => {
    const { pessoasJuridicas, listaPessoasJuridicas } = useDadosPessoaJuridica()

    async function carregaListaPessoasJuridicas(limit, page) {
        return await listaPessoasJuridicas(limit, page)
    }

    useEffect(() => {
        carregaListaPessoasJuridicas(30, 1)
    }, [])

    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Transação</TableCell>
                    <TableCell align="right">Produto</TableCell>
                    <TableCell align="right">CNPJ de Destino</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    doacoes ? doacoes.map((row) => (
                        <TableRow
                            key={row.codigo}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {formataData(row.data)}
                            </TableCell>
                            <TableCell align="right">{row.quantidade}</TableCell>
                            <TableCell align="right">{selectMenuItems.transacoes.find(opcao => opcao.codigo === row.codigo_transacao).valor}</TableCell>
                            <TableCell align="right">
                                <BotaoDadoProduto codigoProduto={row.codigo_produto} selectMenuItems={selectMenuItems} />
                            </TableCell>
                            <TableCell align="right">
                                {pessoasJuridicas ? pessoasJuridicas.map(pj =>
                                    String(pj.cnpj))
                                    :
                                    'Não há pessoas juridicas cadastradas'}
                            </TableCell>
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

export default DataTableDoacao