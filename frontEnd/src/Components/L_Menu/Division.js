import styled from "styled-components";

export default function Division({name, children})
{
    return (
        <STYLE>
            <div className="division_name">{name}</div>
            <div className="division_options">
                {children}
            </div>
        </STYLE>
    )
} 

const STYLE = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #555;
    padding: 1rem;
    .division_name 
    {
        text-transform: capitalize;
        font-weight: 200;
        font-size: x-large;
        color: #777;
    }
    .division_options 
    {
        display: flex;
        flex-direction: column;
        font-weight: 500;
        font-size: large;
        color: #eee;
        padding: 0 0 10px 30px;
        span
        {
            margin: .6rem 0;
        }
    }
`;
