import styled from "styled-components"

const Botao = styled.button`
    width: 40%;
    padding: 0.5em 1em;
    border: 0;
    border-radius: 10px;
    background-color: rgb(251, 94, 130);
    color: #FFFFFF;
    font-size: 28px;
    margin-top: 1em;
    cursor: pointer;
`

const FormBT = ({ children, tipo }) => {

    return (
        <Botao type={tipo}>
            {children}
        </Botao>
    )
}

export default FormBT