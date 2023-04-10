import styled from "styled-components";

const PopUp = ({children, title, confirm, close}) => {
    return (
        <Background>
            <Popup>
                <Title>{title}</Title>
                <Conteudo>{children}</Conteudo>
                <Panel>
                    {confirm && <Confirm onClick={(e) => confirm(e)}>Confirm</Confirm>}
                    <Close onClick={(e) => close(e)}>Close</Close>
                </Panel>
            </Popup>
        </Background>
    )
}

const Background = styled.div`
    z-index: 100;
    display: flex; justify-content: center; align-items: center;
    position: absolute; top: 0; left: 0;
    width: 100vw; height: 100vh;
    background-color: rgba(0,0,0,.3);
`;
const Popup = styled.div`
    display: flex; flex-direction: column;
    padding: 2rem; max-width: 90vw;
    background-color: #266; color: #eee; 
    border-radius: 8px;
`;
const Title = styled.div`
    font-size: 1.4rem;
    border-bottom: 1px solid gray;
`;
const Conteudo = styled.div`
    font-size: .9rem;
    margin-bottom: 1rem;
`;
const Panel = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const Confirm = styled.div`
    background-color: dodgerblue;
    border-radius: 4px;
    padding: .3rem .6rem;
`;
const Close = styled.div`
    background-color: crimson;
    border-radius: 4px;
    padding: .3rem .6rem; margin-left: 1rem;
`;

export default PopUp;