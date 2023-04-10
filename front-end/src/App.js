import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";

import TopStatus from "./Layout/TopStatus";
import Menu from "./Layout/Menu";
import Authentication from "./Pages/Authentication";
import Inventory from "./Pages/Inventory";
import Market from "./Pages/Market";
import Home from "./Pages/Home";


export const GlobalVars = createContext(); 

function App() 
{
	const [nickname, setNickname] = useState();
	const [accountName, setAccountName] = useState();
	const [diamonds, setDiamonds] = useState();
	const [peanuts, setPeanuts] = useState();
	

	
    return (
		<GlobalVars.Provider value={{
			nickname, accountName, diamonds, peanuts,
			setNickname, setAccountName, setDiamonds, setPeanuts
		}}>
			<BrowserRouter>
				<STYLE>
					<div className="main">
						<TopStatus />
						<Routes>
							<Route path="/authentication" element={<Authentication />} />
							<Route path="/" element={<Home />} />
							<Route path="/market" element={<Market />} />
							<Route path="/inventory" element={<Inventory />} />
						</Routes>
					</div>

					<div className="menu">
						<Menu/>
					</div>
				</STYLE>
			</BrowserRouter>
		</GlobalVars.Provider>
    );
}

const STYLE = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	height: 100vh;
	.menu
	{
		width: 100%;
		height: 30%;
		overflow-y: auto;    
		background-color: #444;

	}
	.main
	{
		overflow-y: auto;
		width: 100%;
		height: 70%;
		background-color: #222;
		color: #eee
	} 
`;

export default App;
