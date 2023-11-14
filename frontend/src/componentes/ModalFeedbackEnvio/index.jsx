import { CheckCircleOutline } from "@mui/icons-material"
import { Box, Modal, Typography } from "@mui/material"

const ModalFeedbackEnvio = ({open, handleClose, texto}) => {
    return (
        <Modal
            open={open}
            onClose={(event, reason) => {
                if(reason === 'backdropClick'){
                    handleClose()
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
                    height: '50%',
                    bgcolor: 'background.paper',
                    borderRadius: '15px',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircleOutline sx={{
                        width: '33%',
                        height: '33%',
                        color: 'success.main',
                    }} />
                    <Typography variant="h5" color='success.main'>
                        {texto}
                    </Typography>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalFeedbackEnvio