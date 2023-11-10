import styled from "styled-components"

const Titulo = styled.h1`
    color: rgb(251, 94, 130);
    text-align: center;
    margin-bottom: 1em;
    font-size: 44px;
`

const TituloPrincipal = ({children}) => {
    return(
        <Titulo>
            {children}
        </Titulo>
    )
}

export default TituloPrincipal