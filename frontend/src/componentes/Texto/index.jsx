import styled from "styled-components"

const Paragrafo = styled.p`
    color: rgb(251, 94, 130);
    font-size: ${(props) => props.$tamanho ? props.$tamanho : '14px'};
`

const Texto = ({children, $tamanho}) => {
    return(
        <Paragrafo $tamanho={$tamanho}>
            {children}
        </Paragrafo>
    )
}

export default Texto