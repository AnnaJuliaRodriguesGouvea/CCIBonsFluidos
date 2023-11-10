import { Box, Button, TextField, Modal, Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ModeEdit } from "@mui/icons-material";
import { useState } from "react";
import { useDadosProdutoContext } from "../../commom/context/dadosProduto";
import ModalFeedbackEnvio from "../ModalFeedbackEnvio";

const BotaoEdicaoProduto = ({ dadosProduto, selectMenuItems, page }) => {
    const { alteraProduto } = useDadosProdutoContext()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formValues, setFormValues] = useState({
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
    });

    const handleInputChange = (e) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        alteraProduto(formValues, dadosProduto.codigo, page)
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpenModal}
            >
                <ModeEdit />
            </Button>
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
                        width: '80%',
                        height: '80%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            width: '70%',
                            m: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <Typography variant="h6" component="h2">
                            Editor
                        </Typography>
                        <TextField
                            variant="standard"
                            name="marca"
                            label="Marca"
                            value={formValues.marca}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="standard"
                            name="nome"
                            label="Nome"
                            value={formValues.nome}
                            onChange={handleInputChange}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <FormControlLabel required control={
                                <Checkbox
                                    name="temAba"
                                    checked={formValues.temAba}
                                    onChange={handleInputChange}
                                />
                            }
                                label="Tem aba"
                            />
                            <FormControlLabel required control={
                                <Checkbox
                                    label="Noturno"
                                    name="ehNoturno"
                                    checked={formValues.ehNoturno}
                                    onChange={handleInputChange}
                                />
                            }
                                label="É noturno"
                            />
                            <FormControlLabel required control={
                                <Checkbox
                                    name="temEscapeDeUrina"
                                    checked={formValues.temEscapeDeUrina}
                                    onChange={handleInputChange}
                                />
                            }
                                label="Tem escape de urina"
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextField
                                type="number"
                                label="Quantidade no Pacote"
                                name="quantidadeNoPacote"
                                sx={{ width: '45%' }}
                                value={formValues.quantidadeNoPacote}
                                onChange={handleInputChange}
                            />
                            <TextField
                                type="number"
                                label="Quantidade de Pacote"
                                name="quantidadeDePacote"
                                sx={{ width: '45%' }}
                                value={formValues.quantidadeDePacote}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <FormControl>
                            <InputLabel id="label-tipo-absorvente">Tipo do Absorvente</InputLabel>
                            <Select
                                labelId="label-tipo-absorvente"
                                id="tipoDeAbsorvente"
                                name="tipoDeAbsorvente"
                                label="Tipo do absorvente"
                                value={formValues.tipoDeAbsorvente}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione o tipo do absorvente</MenuItem>
                                {selectMenuItems?.tiposAbsorventes.map(tipoAbsorvente => {
                                    return <MenuItem value={tipoAbsorvente.codigo} key={tipoAbsorvente.codigo}>{tipoAbsorvente.valor}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="label-Suavidade">Suavidade</InputLabel>
                            <Select
                                labelId="label-Suavidade"
                                id="select-Suavidade"
                                name="suavidade"
                                label="Suavidade"
                                value={formValues.suavidade}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione a suavidade</MenuItem>
                                {selectMenuItems?.suavidades.map(suavidades => {
                                    return <MenuItem value={suavidades.codigo} key={suavidades.codigo}>{suavidades.valor}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="label-Fluxo">Fluxo</InputLabel>
                            <Select
                                labelId="label-Fluxo"
                                id="select-Fluxo"
                                name="fluxo"
                                label="Fluxo"
                                value={formValues.fluxo}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione o fluxo</MenuItem>
                                {selectMenuItems?.fluxos.map(fluxo => {
                                    return <MenuItem value={fluxo.codigo} key={fluxo.codigo}>{fluxo.valor}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="label-Tamanho">Tamanho</InputLabel>
                            <Select
                                labelId="label-Tamanho"
                                id="select-Tamanho"
                                name="tamanho"
                                label="Tamanho"
                                value={formValues.tamanho}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione o tamanho</MenuItem>
                                {selectMenuItems?.tamanhos.map(tamanho => {
                                    return <MenuItem value={tamanho.codigo} key={tamanho.codigo}>{tamanho.valor}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="secondary" onClick={(handleOpen)}>
                            Enviar
                        </Button>
                        <ModalFeedbackEnvio open={open} handleClose={handleClose} texto='Produto alterado com sucesso!' />
                    </Box>
                </Box>
            </Modal >
        </>
    )
}

export default BotaoEdicaoProduto