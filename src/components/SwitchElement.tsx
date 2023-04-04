import React from 'react'
import styled from "styled-components";
import {TModelBlockProps, TSwitchElementProps} from "../types/types";

const Switch = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  justify-self: end;
  display: flex;
  justify-content: center;
  background: #F3F4F6;
  width: 243px;
  height: 38px;
  border-radius: 6px;
  line-height: 15px;
  color: #4D5562;
  margin-right: 32px;
`
const SwitchIcon = styled.img`
  margin-right: 10px;
`
const ModeBlock = styled.div<TModelBlockProps>`
  display: flex;
  padding: 8px 12px;
  align-items: center;
  cursor: pointer;
  ${props => props.active && `
    background: #FFFFFF;
    border: 1px solid #E2E3E5;
    border-radius: 5px;
    transition: .3s all ease;
  `}
`

const SwitchElement:React.FC<TSwitchElementProps> = ({mode, toggleMode}) => {
    return (
        <Switch onClick={toggleMode}>
            <ModeBlock active={mode}>
                <SwitchIcon src="/img/eye.png" alt="eye-icon"/>
                {/*<svg fill="none" height="13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>*/}
                <p>Runtime</p>
            </ModeBlock>
            <ModeBlock active={!mode}>
                <SwitchIcon src="/img/arrows.png" alt="switch-icon"/>
                <p>Constructor</p>
            </ModeBlock>
        </Switch>
    );
}

export default SwitchElement;