import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components"
import Stats from "../Components/L_Menu/Stats";
import abbreviation from "../Services/NumberAbreviation.js";

import { BiHappy, BiSmile, BiSad, BiAngry, BiUser } from "react-icons/bi";

import diamondImg from "../Images/diamond-icon.png";
import peanutImg from "../Images/peanut-icon.png";

import { GlobalVars } from "../App";
import axios from "axios";

const acceptance_config = [
    {min: 0, max: 24, method: BiAngry},
    {min: 25, max: 49, method: BiSad},
    {min: 50, max: 74, method: BiSmile},
    {min: 75, max: 100, method: BiHappy}
];

export default function TopStatus()
{
    const globalVars = useContext(GlobalVars);
    const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);

    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.token){
            axios
                .post("http://localhost:4000/auth/auth-session/", {}, { headers: {authorization: `Bearer ${cookies.token}` } })
                .then((el) => {
                    globalVars.setAccountName(el.data.account_name);
                    globalVars.setNickname(el.data.nickname);
                    globalVars.setDiamonds(el.data.diamonds);
                    globalVars.setPeanuts(el.data.peanuts);
                })
                .catch(()=>{
                    navigate("/authentication")
                })
        }
    }, [])

    return (
        <STYLE>
            {(!cookies.token)? 
                <>
                    <span onClick={() => navigate("/authentication")}>Entre Agora</span>
                </>
                :<>
                    <Stats name="Peanuts" value={abbreviation(globalVars.peanuts, 3)}>
                        <img src={peanutImg} alt="peanuts"  />
                    </Stats>
                    <Stats name="Diamonds" value={abbreviation(globalVars.diamonds, 1)}>
                        <img src={diamondImg} alt="diamonds" />
                    </Stats>
                </>
            }
        </STYLE>
    )
}

const STYLE = styled.div`
    height: 64px;
    width: 100%;
    background-color: #333;
    border-bottom: 1px solid #444;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;