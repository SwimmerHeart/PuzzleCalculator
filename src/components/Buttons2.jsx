import React from 'react';
import styled, {css} from "styled-components";

const Button = styled.div.attrs(props => ({
    styleButton: props.styleButton,
    number: props.number,
    mode: props.mode,
    fontSize: props.fontSize > 9,
}))`
  
  //border: ${props => props.isPressKey ? '1px solid #E2E3E5' : '2px solid rgba(93, 95, 239, 1)'};
  ${(props) => {
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
          font-size: 36px;
          line-height: 44px;
          border-radius: 6px;
          color: #111827;
          font-size: ${props => props.fontSize ? '19px' : '36px'};
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
            cursor: ${props => props.mode ? 'pointer' : 'grab'};
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
            cursor: ${props => props.mode ? 'pointer' : 'grab'};
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
            cursor: ${props => props.mode ? 'pointer' : 'grab'};
          `
        default:
            return css`
          background-color: white;
          color: black;
        `;
    }
}}
`

function Buttons({item, currentValue, number, mode, actionFromKeys}) {

    return (
        <Button mode={!mode}
                number={number}
                styleButton={item.classes}
                fontSize={currentValue.length}
                onClick={() => actionFromKeys(item, number)}>

            {item.typeButton === 'block-display' ? currentValue : number}
        </Button>
    );
}

export default Buttons;