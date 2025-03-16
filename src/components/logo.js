import React from "react";
import logoPng from '../lib/logo.png'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const StyledLogo = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;
export default function Logo() {
    const nav = useNavigate();
    const handleClick = ()=>{
        nav("/")
    }
    return (
        <>
            <div style={{overflow:"hidden", width:"100px", overflow:"hidden", height:"60px", cursor:"pointer"}}>
                <StyledLogo onClick={handleClick} src={logoPng} />
            </div>

        </>
    )
}