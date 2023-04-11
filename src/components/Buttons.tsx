import React from 'react';
import styled, {css} from "styled-components";
import {IButtonProps, TButtonsProps} from "../types/types";

const Button = styled.div.attrs<IButtonProps>(props => ({
    styleButton: props.styleButton,
    number: props.number,
    mode: props.mode,
    fontSize: props.fontSize,
}))`
  
  ${(props:IButtonProps) => {
    switch (props.styleButton) {
        case 'display':
            return css`
          background: #F3F4F6;
          width: 100%;
          display: flex;
          justify-content: end;
          align-items: center;
          padding: 0 4px;
          font-weight: 800;
          line-height: 44px;
          border-radius: 6px;
          color: #111827;
          font-size: ${(props:IButtonProps) => props.fontSize ? '19px' : '36px'};
        `
        case 'operand':
            return css`
            width: 100%;
            height: 48px;
            border: 1px solid #E2E3E5;
            &:hover{
              border: 2px solid rgba(93, 95, 239, 1);
            }
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: ${(props:IButtonProps) => props.mode ? 'pointer' : 'grab'};
          `
        case 'number':
            return css`
            width: ${props => props.number === '0' ? '65%' : '72px'}; 
            height: 48px;
            border: 1px solid #E2E3E5;
            &:hover{
              border: 2px solid rgba(93, 95, 239, 1);
            }
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: ${(props:IButtonProps) => props.mode ? 'pointer' : 'grab'};
          `
        case 'number number-result':
            return css`
            width: 100%;
            height: 100%;
            background: #5D5FEF;
            color: #FFFFFF;
            border: 1px solid #E2E3E5;
            &:hover{
              border: 2px solid rgba(93, 95, 239, 1);
            }
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: ${(props:IButtonProps) => props.mode ? 'pointer' : 'grab'};
          `
        default:
            return css`
          background-color: white;
          color: black;
        `;
    }
}}
`

const Buttons:React.FC<TButtonsProps> = ({item, currentValue, number, mode, actionFromKeys}) => {
    const fontSize:boolean = currentValue.length > 9
    return (
        <Button mode={!mode}
                number={number}
                styleButton={item.classes}
                fontSize={fontSize}
                onClick={() => actionFromKeys(item, number)}>

            {item.typeButton === 'block-display' ? currentValue : number}
        </Button>
    );
}

export default Buttons;