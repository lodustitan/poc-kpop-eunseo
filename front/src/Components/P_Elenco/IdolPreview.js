import styled from "styled-components"
import {startTransition, useState} from "react" 
import abbreviation from "../../Services/NumberAbreviation.js";

import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";

import { GiBarefoot, GiMicrophone, GiFemaleLegs, GiBookmarklet, GiMagicLamp } from 'react-icons/gi';
import { BiFlag } from "react-icons/bi";

export default function IdolPreview({idol_id, image_url, name, rarity, type})
{
    function star(qtde){
        let star = ""; for(let i=0;  i<qtde;  i++){star+="⭐"} return star;
    }
    return (
        <STYLE>
            <div className="idol_infoProfile">
                <span>{star(rarity)}</span>
                <img src={image_url} alt="logo" />
            </div>
            <div className="idol_infoStatus">
                <p className="idol_infoStatusName">Name {name}</p> 
                <p className="idol_infoStatusName">ID {idol_id}</p> 
                <p className="idol_infoStatusName">Tipo {type}</p> 
            </div>
        </STYLE>
    )
}

const STYLE = styled.div`
    z-index: 0;
    border-radius: 8px;
    background-color: #444;
    height: 140px;
    margin-bottom: 1rem;
    display: flex;
    height: 100%;
    .idol_infoStatus{
        display: flex;
        flex-direction: column;
    }
    .idol_infoStatusName{
        padding: 0; margin: 0;
        font-weight: 200;
        color: #f5f5f5
    }

    .idol_infoProfile
    {
        position: relative;
        padding: 0; margin: 0;
        span
        {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: -1rem;
            top: -1rem;
            font-size: 1rem;
        }
        img
        {
            height: 96px;
            width: 96px;
            border-radius: 6px;
        }
    }
    .idol_infos, .idol_infoStatusAttributes
    {
        display: flex;
    }
`;