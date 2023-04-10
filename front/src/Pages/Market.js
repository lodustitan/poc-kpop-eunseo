import styled from "styled-components";

import { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import IdolMarket from "../Components/P_Elenco/IdolMarket";
import axios from "axios";

import { GlobalVars } from "../App";

export default function Market()
{

    const globalVars = useContext(GlobalVars);
    const [searchInput, setSearchInput] = useState();

    const [search, setSearch] = useState();

    function searchIdol(){
        if(searchInput !== "") {
            let filter;
            if(isNaN(searchInput)) filter = "idol_name";
            else filter = "idol_id";

            const url = `http://localhost:4000/market?${filter}=${searchInput}`;

            axios
                .get(url)
                .then((res)=> {
                    console.log(res.data);
                    setSearch(res.data.result);
                });
        }
    }
    useEffect(()=>{
        axios
            .post("http://localhost:4000/auth", {}, {headers: {account_name: globalVars.accountName}})
            .then(el => {
                globalVars.setAccountName(el.data.account_name);
                globalVars.setNickname(el.data.nickname);
                globalVars.setDiamonds(el.data.diamonds);
                globalVars.setPeanuts(el.data.peanuts);
            });
    }, [])

    return (
        <STYLE>
            <div className="home_news">
                <div className="home_newsRanking">
                    <div className="home_newsRankingHeader">
                        <input type="text" placeholder="Pesquisar Idol" value={searchInput} onChange={el => setSearchInput(el.target.value)}></input>
                        <button onClick={searchIdol}>Search</button>
                    </div>
                    <div>
                        {search && search.map( (el,i) =><IdolMarket 
                            key={el.i}
                            idol_id={el.idol_id}
                            image_url={el.idols.image_url}
                            name={el.idols.name}
                            rarity={el.idols.rarity}
                            type={el.idols.type}

                            market_id={el.id}
                            price={el.price}
                        />)}
                    </div>
                </div>
            </div>
        </STYLE>
    );
}

const STYLE = styled.div`
    box-sizing: border-box;
    width: 100%;

    .home_news
    {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 520px;
        margin-top: 1rem;
        overflow-y: auto;
        .home_newsRanking{height: 100%} 
        .home_newsRanking, .home_newsChangelogs{
            overflow-y: auto;
            width: 100%;
            div {
                padding: 1rem 1rem;
            }
            .home_newsRankingHeader, .home_newsChangelogsHeader {
                z-index: 1;
                background-color: #111;
                position: sticky;
                top: 0;
            }
            .home_newsRankingItem, .home_newsChangelogsItem {
                background-color: #222;
                &>div { max-height: 100px }
                img { max-height: 48px; max-width: 48px}
                font-size: .8rem;
            }
        }
        
    }
    .elenco_panel
    {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 64px;
        padding: 1rem;
        background-color: #333;
    }
`;