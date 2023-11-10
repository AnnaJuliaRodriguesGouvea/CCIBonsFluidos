import { TextField } from "@mui/material"

const FormDoacaoEdicao = ({ formValues, handleInputChange }) => {
    return (
        <>
            <TextField
                variant="standard"
                name="data"
                label="Data"
                value={formValues.data}
                type="date"
                onChange={handleInputChange}
            />
            <TextField
                variant="standard"
                name="quantidade"
                label="Quantidade"
                value={formValues.quantidade}
                type="number"
                onChange={handleInputChange}
            />
        </>
    )
}

export default FormDoacaoEdicao