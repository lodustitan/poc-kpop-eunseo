import styled from "styled-components"
import {startTransition, useState, useContext} from "react" 
import abbreviation from "../../Services/NumberAbreviation.js";

import { useCookies } from "react-cookie";
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";

import { GiBarefoot, GiMicrophone, GiFemaleLegs, GiBookmarklet, GiMagicLamp } from 'react-icons/gi';
import { BiFlag } from "react-icons/bi";

import PopUp from "../PopUps/PopUp.js";
import axios from "axios";
import { GlobalVars } from "../../App";


export default function IdolPreview({idol_id, image_url, name, rarity, type})
{

    const globalVars = useContext(GlobalVars);
    const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);

    const [showPopup, setShowPopup] = useState(false);
    const [modalId, setModalId] = useState(0);
    const [idolId, setIdolId] = useState(idol_id);
    
    function star(qtde){
        let star = ""; for(let i=0;  i<qtde;  i++){star += "⭐"} return star;
    }

    function sellCard(){
        console.log(idolId);
        axios.post("http://localhost:4000/market/sell", {idolId}, { headers: {authorization: `Bearer ${cookies.token}`} })
    }

    const modals = [
        <PopUp title="Sell" input={true} confirm={() => sellCard()} close={() => { setShowPopup(!showPopup);  } }>
        Digite o valor da venda</PopUp>,

    ];
    return (
        <STYLE>
            {showPopup && modals[modalId]}

            <div className="idol_infoProfile">
                <span>{star(rarity)}</span>
                <img src={image_url} alt="logo" />
            </div>
            <div className="idol_infoStatus">
                { /* <p className="idol_infoStatusName">ID {idol_id}</p> */ } 
                <p className="idol_infoStatusName_name">{name}</p> 
                <p className="idol_infoStatusName">{type}</p> 
            </div>
            <div className="idol_painel">
                <p onClick={() => setShowPopup(!showPopup)}>Sell</p>
                <p>Burn</p>
            </div>
        </STYLE>
    )
}

const STYLE = styled.div`
    z-index: 0;
    border-radius: 8px;
    background-color: #444;
    margin-bottom: 1rem;
    display: flex;
    height: 100%;
    .idol_painel {
        position: relative; top: -20px;
        display: flex; flex-direction: column;
        margin: 0; padding: 0;
        p { 
            padding: 0; margin: 4px 
        }
    }
    .idol_infoStatus{
        display: flex;
        flex-direction: column;
        p {
            padding: 0;
            width: 100%;
        }
    }
    .idol_infoStatusName{
        padding: 16px 0; margin: 0;
        font-weight: 200;
        color: #f5f5f5
    }
    .idol_infoStatusName_name{
        padding: 0; margin: 0;
        font-size: 14px; font-weight: 700;
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