import { useEffect, useState } from "react"
import { useDadosProdutoContext } from "../../commom/context/dadosProduto"
import { Box, Button, Divider, Modal, Typography } from "@mui/material";


const BotaoDadosProduto = ({ codigoProduto, selectMenuItems }) => {
    const { listaUmProduto, produto } = useDadosProdutoContext()

    const carregaProduto = async (codigoProduto) => {
        await listaUmProduto(codigoProduto)
    }

    useEffect(() => {
        carregaProduto(codigoProduto)
    }, [])

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button onClick={handleOpenModal}>Produto descrição</Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
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
                            <Typography variant="body"><strong>Marca</strong>: {produto?.marca}</Typography>
                            <Typography variant="body"><strong>Nome</strong>: {produto?.nome}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="body"><strong>Abas</strong>: {produto?.temAbas ? "Sim" : "Não"}</Typography>
                            <Typography variant="body"><strong>É noturno</strong>: {produto?.isNoturno ? "Sim" : "Não"}</Typography>
                            <Typography variant="body"><strong>Escape de Urina</strong>: {produto?.temEscapeUrina ? "Sim" : "Não"}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="body"><strong>Quantidade no Pacote</strong>: {String(produto?.quantidadeNoPacote)}</Typography>
                            <Typography variant="body"><strong>Quantidade de Pacote</strong>: {String(produto?.quantidadeDePacote)}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center',
                            gap: '16px'
                        }}>
                            <Typography variant="body"><strong>Tipo do Absorvente</strong>: {
                                produto ? selectMenuItems?.tiposAbsorventes.find(tipoAbsorvente => tipoAbsorvente.codigo === produto.codigo_tipo_absorvente).valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Suavidade</strong>: {
                                produto ? selectMenuItems?.suavidades.find(suavidade => suavidade.codigo === produto.codigo_suavidade).valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Fluxo</strong>: {
                            produto ? selectMenuItems?.fluxos.find(fluxo => fluxo.codigo === produto?.codigo_fluxo).valor : 'NÃO INFORMADO'}</Typography>
                            <Typography variant="body"><strong>Tamanho</strong>: {
                            produto ? selectMenuItems?.tamanhos.find(tamanho => tamanho.codigo === produto?.codigo_tamanho).valor : 'NÃO INFORMADO'}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal >
        </>
    )
}

export default BotaoDadosProduto