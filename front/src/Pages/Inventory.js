import styled from "styled-components";

import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import IdolPreview from "../Components/P_Elenco/IdolPreview";
import axios from "axios";

import { GlobalVars } from "../App";

export default function Home()
{

    const globalVars = useContext(GlobalVars);
    const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);
    const [searchInput, setSearchInput] = useState();

    const [search, setSearch] = useState();
    const [inventory, setInventory] = useState();

    function searchIdol(){
        if(searchInput !== "") {
            let filter;
            if(isNaN(searchInput)) filter = "idol_name";
            else filter = "idol_id";

            const url = `http://localhost:4000/idols?${filter}=${searchInput}`;

            axios
                .get(url)
                .then((res)=> {
                    setSearch(res.data);
                });
        }
    }
    function refreshInv(){
        axios
            .get("http://localhost:4000/user/inv", { headers: {authorization: `Bearer ${cookies.token}`} })
            .then(el => { setInventory(el.data) 
            })
    }

    useEffect(() => {
        refreshInv();
    }, [])

    return (
        <STYLE>
            <div className="home_news">
                <div className="home_newsChangelogs">    
                
                    <div className="home_newsRankingHeader">
                        <input type="text" placeholder="Pesquisar Idol" value={searchInput} onChange={el => setSearchInput(el.target.value)}></input>
                        <button onClick={searchIdol}>Search</button>
                        <div className="home_newsChangelogsHeader" onClick={refreshInv}>
                            Inventorio (clique aqui para atualizar)
                        </div>
                    </div>     


                    <div className="home_newsChangelogsItem">
                        {inventory && inventory.map( (el,i) => {
                            console.log(el);
                            return (<IdolPreview 
                                key={el.i}
                                idol_id={el.id}
                                image_url={el.image_url}
                                name={el.name}
                                rarity={el.rarity}
                                type={el.type}
                            />)
                        })
                        }
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
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 1rem;
        height: 520px;
        .home_newsRanking{height: 65%} 
        .home_newsChangelogs{height: 100%}
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