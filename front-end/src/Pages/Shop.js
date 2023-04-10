import styled from "styled-components";

import Button from "react-bootstrap/Button"

import { useEffect, useState } from "react";
import axios from "axios";
import ShopItem from "../Components/P_Shop/ShopItem";

export default function Shop()
{
    const [shopList, setShopList] = useState();
    const [idolName, setIdolName] = useState("");


    useEffect(()=>{
        axios.get("http://localhost:4000/store")
            .then( el => setShopList(el.data))
    }, [])
    return (
        <STYLE>
            <input type="text" placeholder="Nome do Idol" value={idolName} onChange={e => setIdolName(e.target.value)} />
            <div className="shop_idols">
                {shopList &&
                    shopList.map( el => <ShopItem 
                        shopId={el.id}
                        packName={el.name}
                        imageUrl={el.image_url}
                        description={el.description}
                        price={el.price}
                        nameTyped={idolName}
                    />)
                }
            </div>
        </STYLE>
    );
}

const STYLE = styled.div`
    box-sizing: border-box;
    padding: 0 2rem;

    input {
        background-color: transparent;
        border: 2px solid #eee;
        border-radius: 4px;
        color: #eee;
        font-size: 1.2rem;
        padding: 0 1rem;
        margin: 1rem;
    }
    .shop_teams, .shop_idols
    {
        overflow-y: auto;
        margin-top: 1.5rem;
    }
    .shop_idols
    {
        display: flex;
        flex-wrap: wrap;
    }
    .shop_panel
    {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 64px;
        padding: 1rem;
        background-color: #333;
    }
`;