import styled from "styled-components"
import Texto from "../Texto"
import { Link } from "react-router-dom"

const ContainerCadastrar = styled.section`
    background-color: rgba(255 255 255 / 65%);
    width: 900px;
    height: 120px;
    margin: 5% auto;
    border-radius: 25px;
`

const Span = styled.span`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 10px;
`

const LinkEstilizado = styled(Link)`
    text-decoration: none;
`

const ContainerLinkCadastrar = () => {
    return (
        <ContainerCadastrar>
            <Span>
                <Texto $tamanho="32px">Não possui uma conta?</Texto>
                <LinkEstilizado to={'/cadastrar'}>
                    <Texto $tamanho="32px">Cadastra-se</Texto>
                </LinkEstilizado>
            </Span>
        </ContainerCadastrar>
    )
}

export default ContainerLinkCadastrar