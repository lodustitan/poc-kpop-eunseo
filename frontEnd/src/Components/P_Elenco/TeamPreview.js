import styled from "styled-components"
import abbreviation from "../../Services/NumberAbreviation.js";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function TeamPreview({logo, name, fans, activite, overhall})
{
    return (
        <STYLE>
            <div className="overhall">
                <span>{overhall}</span>
                <img src={logo} alt="logo" />
            </div>
            <div className="teamPreview_main">
                <div className="teamPreview_c1">
                    <div className="teamPreview_division">
                        <span className="teamPreview_divisionTitle">Nome:</span>
                        <span className="teamPreview_divisionValue">{name}</span>
                    </div>
                    <div className="teamPreview_division">
                        <span className="teamPreview_divisionTitle">Fans:</span>
                        <span className="teamPreview_divisionValue">{abbreviation(fans, 1)}</span>
                    </div>

                    <div className="teamPreview_division">
                        <span className="teamPreview_divisionTitle">Atividade:</span>
                        <span className="teamPreview_divisionValue">{activite}</span>
                    </div>
                </div>
                <div className="teamPreview_panel">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button>Nova Música</Button> 
                        <Button>Novo Album</Button> 
                    </ButtonGroup>
                    <ButtonGroup aria-label="Third group">
                        <Button variant="primary">Editar</Button>
                        <Button variant="outline-danger">Desbandar</Button>
                    </ButtonGroup>
                </div>
            </div>
        </STYLE>
    )
}

const STYLE = styled.div`
    display: flex;
    justify-content: space-between;
    height: 8rem;
    padding: 1rem;
    background-color: #282828;
    .overhall
    {
        position: relative;
        width: 180px;
        height: 96px;
        span
        {
            position: absolute;
            right: -1rem;
            top: -1rem;
            font-size: 2rem;
        }
        img
        {
            border-radius: 6px;
            height: 96px;
            width: 180px;
        }
    }
    .teamPreview_c1
    {
        display: flex;
        justify-content: space-between;
    }
    .teamPreview_main
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .teamPreview_panel
    {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }
    .teamPreview_division
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 240px;
        padding-left: 2rem;

        .teamPreview_divisionTitle
        {
            font-weight: 400;
            color: #999;
        }
        .teamPreview_divisionValue
        {
            font-weight: 600;
        }
    }
`;