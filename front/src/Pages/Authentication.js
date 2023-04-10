import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { GlobalVars } from "../App";

export default function Authentication ()
{
    const globalVars = useContext(GlobalVars);
    const navigate = useNavigate()

    const [ pageLoginType, setPageLoginType ] = useState(true);
    const [ f_login, setLogin ] = useState();
    const [ f_pass, setPass ] = useState();
    const [ f_cpass, setCPass ] = useState();
    const [ f_nickname, setNickname ] = useState();
    const [ warning, setWarning ] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);

    function togglePageType ()
    {
        setPageLoginType ( !pageLoginType );
    }

    function authentication ()
    {

        if(pageLoginType){
            axios
                .post("http://localhost:4000/auth/sign-in", {account_name: f_login, password: f_pass})
                .then(el => {
                    removeCookie("token");
                    setCookie("token", el.data.token);
                    globalVars.setAccountName(el.data.userInfos.account_name);
                    globalVars.setNickname(el.data.userInfos.nickname);
                    globalVars.setDiamonds(el.data.userInfos.diamonds);
                    globalVars.setPeanuts(el.data.userInfos.peanuts);

                })
                .catch(err => setWarning("Login inválido"));
        }
        else{
            if(f_pass !== f_cpass) return setWarning("Confime a senha corretamente");
            axios
                .post("http://localhost:4000/auth/sign-up", {account_name: f_login, password: f_pass, nickname: f_nickname})
                .then(el => togglePageType())
                .catch(err => setWarning("Campos inválido"));

        }
    }

    

    return (
        <STYLE>
            <div className="authentication_mainBox">
                <div className="authentication_mainBoxForm">
                    <p className="authentication_mainBoxWarning">{warning}</p>
                {pageLoginType ? 
                    <>
                        <input onChange={e => setLogin(e.target.value)} value={f_login} type="text" placeholder="Nome da Conta - Login" />
                        <input onChange={e => setPass(e.target.value)} value={f_pass} type="password" placeholder="Senha" />
                    </>
                    : 
                    <>
                        <input onChange={e => setLogin(e.target.value)} value={f_login} type="text" placeholder="Nome da Conta - Login" />
                        <input onChange={e => setNickname(e.target.value)} value={f_nickname} type="text" placeholder="Nome da Company - Nickname" />
                        <input onChange={e => setPass(e.target.value)} value={f_pass} type="password" placeholder="Senha" />
                        <input onChange={e => setCPass(e.target.value)} value={f_cpass} type="password" placeholder="Confirme sua Senha" />
                    </>
                    }
                    <button onClick={authentication}>{pageLoginType? "Sign-In":"Sign-Up"}</button>

                </div>
                <div className="authentication_mainBoxOptions">
                    <p onClick={togglePageType}>{pageLoginType? "Criar Conta":"Logar-se"}</p>
                </div>
            </div>
        </STYLE>
    )
}

const STYLE = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .authentication_mainBox
    {
        box-sizing: border-box;
        width: 500px;
        height: 380px;
    }
    .authentication_mainBoxForm
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        input
        {
            height: 3rem;
            width: 100%;
            border: 2px solid white;
            border-radius: 4px;
            padding: 0 1rem;
            margin-bottom: 1rem;
            background-color: transparent;
            color: white;
            font-size: 1.2rem;
        }
        button 
        {
            border: none;
            border-radius: 4px;
            width: 50%;
            height: 3rem;
            background-color: #777;
            color: white;
            font-size: 1.3rem;
        }
    }
    .authentication_mainBoxOptions
    {
        text-align: center;
    }
    .authentication_mainBoxWarning
    {
        color: red;
    }
`;