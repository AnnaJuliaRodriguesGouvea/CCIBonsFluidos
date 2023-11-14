import styled from "styled-components"

const Rotulo = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    
    color: rgb(251, 94, 130);
    font-size: 20px;
    font-weight: 500;
    line-height: 16px;
`

const InputRadio = styled.input`
    appearance: none;

    height: 1.2em;
    width: 1.2em;
    border: 2px solid black;
    border-radius: 50%;
    background-color: rgb(255, 255, 255, 85%);

    &:checked {
        border: 4px solid rgb(245, 55, 99);
        background-color: rgb(255, 255, 255, 85%);
    }
`

const RadioButton = ({ label, valorSelecionado, valorEsperado ,onchange, valor, nome }) => {
    return (
        <Rotulo>
            {label}
            <InputRadio
                type="radio"
                checked={valorSelecionado === valorEsperado}
                onChange={(e) => onchange(e.target.value)}
                value={valor}
                name={nome}
            />
        </Rotulo>
    )
}

export default RadioButton