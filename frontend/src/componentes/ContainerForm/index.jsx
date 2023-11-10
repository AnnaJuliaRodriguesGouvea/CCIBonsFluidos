import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
        background-color: rgba(255 255 255 / 35%);
        width: 900px;
        height: ${props => props.$altura ? props.$altura : '590px'};
        margin: 5% auto;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        border: 2px solid rgba(255, 255, 255, 80%);
`

const BotaoVoltar = styled.button`
    color: rgba(255, 255, 255, 90%);
    font-size: 24px;
    position: absolute;
    top: 1.5em;
    left: 2em;
    border: 2px solid rgba(255, 255, 255, 80%);
    border-radius: 15px;
    background-color: transparent;
    height: 1.5em;
    width: 1.5em;
    cursor: pointer;
`

const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    width: ${props => props.$largura ? props.$largura : '75%'};
`

const ContainerForm = ({ children, $altura ,$largura, botaoVoltar = false, handleSubmit}) => {

    const navigate = useNavigate();

    return (
        <Container $altura={$altura}>
            {botaoVoltar && <BotaoVoltar onClick={() => navigate(-1)}>{'<'}</BotaoVoltar>}
            <Formulario $largura={$largura} onSubmit={(e)=>handleSubmit(e)}>
                {children}
            </Formulario>
        </Container>
    )
}

export default ContainerForm