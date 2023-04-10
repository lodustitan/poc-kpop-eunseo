import styled from "styled-components"
import Division from "../Components/L_Menu/Division";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GlobalVars } from "../App";

import PopUp from "../Components/PopUps/PopUp";
import axios from "axios";

export default function Menu(){
    const globalVars = useContext(GlobalVars);
    const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);

    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const work = (event) => {
        event.stopPropagation();
        axios
            .post("http://localhost:4000/user/work", {}, { headers: {authorization: `Bearer ${cookies.token}`} })
            .then(() =>  setShowPopup(!showPopup))
    }
    const gacha = (event) => {
        event.stopPropagation();
        axios
            .post("http://localhost:4000/user/gacha", {}, { headers: {authorization: `Bearer ${cookies.token}`} })
            .then(() => navigate("/"))
    }

    return (
        <STYLE>
            <Division name="Main">
                {(globalVars.accountName)&&<>
                    <MenuButton onClick={() => navigate("/")}>Home</MenuButton>
                    <MenuButton onClick={() => navigate("/inventory")}>Inventário</MenuButton>
                    <MenuButton onClick={work}>Work</MenuButton>
                    
                    {showPopup && <PopUp title="Work" close={() => { setShowPopup(!showPopup);  } }>
                        Seu trabalho gerou 100 peanuts
                    </PopUp>}

                    <MenuButton onClick={gacha}>Gacha</MenuButton>
                    <MenuButton onClick={() => navigate("/market")}>Market</MenuButton>
                </>}
            </Division>
            {(globalVars.accountName)&&
            <Division name="Mini-Game">
                <MenuButton>Quiz (coming soon)</MenuButton>
            </Division>}
        </STYLE>
    )
}

const STYLE = styled.div`
    z-index: 999;
    width: 100%;
    height: 100%;
    border-right: 1px solid #555;
    color: #eee; 
`;
const MenuButton = styled.div`
    padding: .4rem 1rem;
    background-color: dodgerblue;
    border-radius: 5px;
    margin-bottom: 1rem;
`