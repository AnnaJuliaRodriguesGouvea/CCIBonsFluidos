import styled from "styled-components"

const Div = styled.div`
    position: relative;
`

const Rotulo = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;  

    color: rgb(251, 94, 130);
    font-size: 20px;
    font-weight: 500;
    line-height: 16px;
`

const InputCheckbox = styled.input`
    appearance: none;

    height: 1.4em;
    width: 1.4em;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: #FFF;

    &:checked::before{
        content: "✔";
        color: rgb(248, 57, 101);
        font-size: 20px;
        position: absolute;
        top: .2em;
        left: 7.2em;
    }
`

const Checkbox = ({ label, nome, admin, valor, handleCheckboxChange }) => {
    return (
        <Div>
            <Rotulo>
                {label}
                <InputCheckbox
                    type="checkbox"
                    name={nome}
                    checked={admin}
                    value={valor}
                    onChange={handleCheckboxChange}
                />
            </Rotulo>
        </Div>
    )
}

export default Checkbox