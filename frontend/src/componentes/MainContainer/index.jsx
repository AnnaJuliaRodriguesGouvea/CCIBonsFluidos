import { Outlet } from "react-router-dom"
import styled from "styled-components"


const Container = styled.div`
        /* background: linear-gradient(#F96DB0, #DEBB9B); */
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
`

const MainContainer = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    )
}

export default MainContainer