import {useContext, useEffect, useState} from "react"
import { Box, Divider, Modal, Typography } from "@mui/material";
import {listaUmProduto} from "../../service/produtoService.jsx";
import {
    getFluxo,
    getSuavidade,
    getTamanho,
    getTiposAbsorvente
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
    const [produto, setProduto] = useState({})

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

    async function carregaProduto() {
        const result = await listaUmProduto(dadosProduto.codigo_produto, appContext.setError)

        setFormValues({
            codigo: result.codigo,
            marca: result.marca,
            nome: result.nome,
            temAba: result.temAbas,
            ehNoturno: result.isNoturno,
            temEscapeDeUrina: result.temEscapeUrina,
            quantidadeNoPacote: result.quantidadeNoPacote,
            quantidadeDePacote: result.quantidadeDePacote,
            tipoDeAbsorvente: result.codigo_tipo_absorvente,
            suavidade: result.codigo_suavidade,
            fluxo: result.codigo_fluxo,
            tamanho: result.codigo_tamanho,
        })
    }

    useEffect(() => {
        carregaProduto()
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
                            <Typography variant="body"><strong>Marca</strong>: {formValues?.marca}</Typography>
                            <Typography variant="body"><strong>Nome</strong>: {formValues?.nome}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="body"><strong>Abas</strong>: {formValues?.temAbas ? "Sim" : "Não"}</Typography>
                            <Typography variant="body"><strong>É noturno</strong>: {formValues?.isNoturno ? "Sim" : "Não"}</Typography>
                            <Typography variant="body"><strong>Escape de Urina</strong>: {formValues?.temEscapeUrina ? "Sim" : "Não"}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="body"><strong>Quantidade no Pacote</strong>: {String(formValues?.quantidadeNoPacote)}</Typography>
                            <Typography variant="body"><strong>Quantidade de Pacote</strong>: {String(formValues?.quantidadeDePacote)}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center',
                            gap: '16px'
                        }}>
                            <Typography variant="body"><strong>Tipo do Absorvente</strong>: {
                                formValues ? listaTiposAbsorventes?.find(tipoAbsorvente => tipoAbsorvente.codigo === formValues.tipoDeAbsorvente)?.valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Suavidade</strong>: {
                                formValues ? listaSuavidades?.find(suavidade => suavidade.codigo === formValues.suavidade)?.valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Fluxo</strong>: {
                                formValues ? listaFluxos?.find(fluxo => fluxo.codigo === formValues?.fluxo)?.valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Tamanho</strong>: {
                                formValues ? listaTamanhos?.find(tamanho => tamanho.codigo === formValues?.tamanho)?.valor : 'NÃO INFORMADO'}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal >
        </>
    )
}

export default ModalDadosProduto