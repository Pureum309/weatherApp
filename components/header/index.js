import styled from "styled-components"

const Cont = styled.div`
    width: 100%;
    height: 50%;
    background-color: skyblue;

    display: flex;
    align-items: center;
`
const Logo = styled.img`
    width: 15%;
    height: auto;
    margin: 1em;
    border-radius: 1em;
`
const Txt = styled.h1`
`

export default function HeaderComp() {
    return (
        <>
            <Cont>
                <Logo src="./forecast.png" />
                <Txt>Travel Weather App</Txt>
            </Cont>
        </>
    )
}