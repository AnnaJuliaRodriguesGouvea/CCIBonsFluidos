import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Campo = styled.input`
    border: none;
    border-radius: 10px;
    padding: 12px;
    width: 100%;
    margin: 1em 0;
    box-sizing: border-box;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
    outline: none;
`

const Rotulo = styled.label`
    color: rgb(251, 94, 130);
    font-size: 20px;
    font-weight: 500;
    line-height: 16px;
    margin-top: 1em;
`

const CampoTexto = memo(({ label, nome, tipo, valor, placeholder, aoAlterar, id }) => {
    return (
        <Container>
            <Rotulo htmlFor={id}>{label}</Rotulo>
            <Campo
                type={tipo}
                name={nome}
                value={valor}
                placeholder={placeholder}
                onChange={aoAlterar}
                required
                id={id}
            />
        </Container>
    )
})

export default CampoTexto