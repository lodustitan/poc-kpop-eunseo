import styled from "styled-components";

export default function Stats({name, value, children})
{
    return(
        <STYLE>
            <div className="stats_icon">
                {children}
            </div>
            <div className="stats_values">
                <span className="stats_name">{name}</span>
                <span className="stats_value">{value}</span>
            </div>
        </STYLE>
    )
}

const STYLE = styled.div`
    display: flex;
    align-items: center;
    height: 100%;

    &:hover{
        background-color: black;
        transition: background-color 1s;
    }

    .stats_icon
    {
        padding: 0 .1rem;
        img{
            width: 32px;
        }
    }
    .stats_values
    {
        font-size: .8rem;
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
    
    }
    .stats_name 
    {
        font-weight: 500;
        color: #959595;
    }
    .stats_value
    {
        font-weight: 300;
        color: #777;
    }
`;