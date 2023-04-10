import styled from "styled-components"
import abbreviation from "../../Services/NumberAbreviation.js";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { GlobalVars } from "../../App.js";
import axios from "axios";

export default function ShopItem({shopId, packName, imageUrl, description, price, nameTyped})
{
    const globalVars = useContext(GlobalVars);
    const navigate = useNavigate();

    const [id] = useState(shopId);

    function buyIdol ()
    {
        const query = {
            user_id: globalVars.userId,
            shop_id: id,
            idol_name: nameTyped
        }
        console.log(query);
        axios.post("http://localhost:4000/store", query)
        .then( el => navigate("/elenco"));
    }

    return (
        <STYLE>
            <div className="overhall">
                <div className="shopItem_name">{packName}</div>
                <div className="shopItem_image">
                    <img src={imageUrl} alt="packLogo" />
                </div>
                <div className="shopItem_description">{description}</div>
                <div className="shopItem_price">{abbreviation(price, 3)}</div>
            </div>
                <button disabled={!(globalVars.cash >= price && nameTyped !== "")} onClick={buyIdol}>Comprar</button>
        </STYLE>
    )
}

const STYLE = styled.div`
    width: 330px;
    height: 300px;
    .shopItem_name { 
        font-size: 1.5rem;
    }
`;