import styled from "styled-components"
import { Link } from "react-router-dom"

const ContainerCadastrar = styled.section`
    background-color: rgba(255 255 255 / 65%);
    width: 900px;
    height: 120px;
    margin: 5% auto;
    border-radius: 25px;

    @media screen and (max-width: 950px) {
        width: 80%;
        margin: 0 10%;
      }
`

const Span = styled.span`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 10px;
    align-items: center;
`

const Texto = styled.p`
    color: rgb(251, 94, 130);
    font-size: 32px;

    @media screen and (max-width: 950px) {
        font-size: 18px;
      }
`

const LinkEstilizado = styled(Link)`
    text-decoration: none;
`

const ContainerLinkCadastrar = () => {
    return (
        <ContainerCadastrar>
            <Span>
                <Texto>Não possui uma conta?</Texto>
                <LinkEstilizado to={'/cadastrar'}>
                    <Texto>Cadastre-se</Texto>
                </LinkEstilizado>
            </Span>
        </ContainerCadastrar>
    )
}

export default ContainerLinkCadastrar