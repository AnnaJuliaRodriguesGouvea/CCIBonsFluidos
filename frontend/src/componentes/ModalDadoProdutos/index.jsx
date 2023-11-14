import {useContext, useEffect, useState} from "react"
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import {listarProdutos, listaUmProduto} from "../../service/produtoService.jsx";
import {
    getFluxo,
    getSuavidade,
    getTamanho,
    getTiposAbsorvente,
    getTransacao
} from "../../service/parametrizacaoService.jsx";
import {AppContext} from "../../commom/context/appContext.jsx";
import {DadosParametrizacao} from "../../commom/context/dadosParametrizacao.jsx";


const ModalDadosProduto = ({ dadosProduto, visible, closeModal }) => {
    const appContext = useContext(AppContext)
    const {
        listaTiposAbsorventes, setListaTiposAbsorventes,
        listaSuavidades, setListaSuavidades,
        listaFluxos, setListaFluxos,
        listaTamanhos, setListaTamanhos,
    } = useContext(DadosParametrizacao)
    const [formValues, setFormValues] = useState({
        codigo: "",
        marca: "",
        nome: "",
        temAba: false,
        ehNoturno: false,
        temEscapeDeUrina: false,
        quantidadeNoPacote: "",
        quantidadeDePacote: "",
        tipoDeAbsorvente: "",
        suavidade: "",
        fluxo: "",
        tamanho: "",
    });

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
        setFormValues({
            codigo: dadosProduto.codigo_produto,
            marca: dadosProduto.marca,
            nome: dadosProduto.nome,
            temAba: dadosProduto.temAbas,
            ehNoturno: dadosProduto.isNoturno,
            temEscapeDeUrina: dadosProduto.temEscapeUrina,
            quantidadeNoPacote: dadosProduto.quantidadeNoPacote,
            quantidadeDePacote: dadosProduto.quantidadeDePacote,
            tipoDeAbsorvente: dadosProduto.codigo_tipo_absorvente,
            suavidade: dadosProduto.codigo_suavidade,
            fluxo: dadosProduto.codigo_fluxo,
            tamanho: dadosProduto.codigo_tamanho,
        })
    }, [dadosProduto])

    useEffect(() => {
        carregaDadosTipoAbsorvente()
        carregaDadosSuavidade()
        carregaDadosFluxo()
        carregaDadosTamanho()
    }, [])

    return (
        <>
            <Modal
                open={visible}
                onClose={closeModal}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        height: '70%',
                        bgcolor: 'background.paper',
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: '70%',
                            m: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px'
                        }}
                    >
                        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', my: 2 }}>
                            Descrição do Produto
                        </ Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="body"><strong>Marca</strong>: {dadosProduto?.marca}</Typography>
                            <Typography variant="body"><strong>Nome</strong>: {dadosProduto?.nome}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="body"><strong>Abas</strong>: {dadosProduto?.temAbas ? "Sim" : "Não"}</Typography>
                            <Typography variant="body"><strong>É noturno</strong>: {dadosProduto?.isNoturno ? "Sim" : "Não"}</Typography>
                            <Typography variant="body"><strong>Escape de Urina</strong>: {dadosProduto?.temEscapeUrina ? "Sim" : "Não"}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="body"><strong>Quantidade no Pacote</strong>: {String(dadosProduto?.quantidadeNoPacote)}</Typography>
                            <Typography variant="body"><strong>Quantidade de Pacote</strong>: {String(dadosProduto?.quantidadeDePacote)}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center',
                            gap: '16px'
                        }}>
                            <Typography variant="body"><strong>Tipo do Absorvente</strong>: {
                                dadosProduto ? listaTiposAbsorventes?.find(tipoAbsorvente => tipoAbsorvente.codigo === dadosProduto.codigo_tipo_absorvente).valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Suavidade</strong>: {
                                dadosProduto ? listaSuavidades?.find(suavidade => suavidade.codigo === dadosProduto.codigo_suavidade).valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Fluxo</strong>: {
                                dadosProduto ? listaFluxos?.find(fluxo => fluxo.codigo === dadosProduto?.codigo_fluxo).valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Tamanho</strong>: {
                                dadosProduto ? listaTamanhos?.find(tamanho => tamanho.codigo === dadosProduto?.codigo_tamanho).valor : 'NÃO INFORMADO'}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal >
        </>
    )
}

export default ModalDadosProduto