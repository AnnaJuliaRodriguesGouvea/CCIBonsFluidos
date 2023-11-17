import { Box, Modal, Typography, Button } from "@mui/material"

const ModalExcluirProduto = ({visible, closeModal, clickExcluir}) => {
    return (
        <Modal
            open={visible}
            onClose={(event, reason) => {
                if(reason === 'backdropClick'){
                    closeModal()
                }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '35%',
                    minWidth: '320px',
                    height: '50%',
                    bgcolor: 'background.paper',
                    borderRadius: '15px',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Typography variant="h4" color='red' textAlign={"center"}>Certeza que deseja excluir o produto?</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', gap: '20px', justifyContent: 'center', marginTop: '10px'}}>
                        <Button variant="contained" color="error" size="large" sx={{paddingX: '30px', paddingY: '20px', fontSize: '22px'}} onClick={clickExcluir}>Excluir</Button>
                        <Button variant="outlined" size="large" sx={{paddingX: '18px', paddingY: '20px', fontSize: '22px'}} onClick={closeModal}>Cancelar</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalExcluirProduto