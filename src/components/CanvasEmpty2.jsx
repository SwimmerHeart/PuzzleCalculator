import React from 'react';
import styled from "styled-components";

const CanvasImg = styled.img`
  margin-bottom: 12px;
  width: 18px;
  height: 18px;
`
const CanvasTitle = styled.h4`
  line-height: 17px;
  color: rgba(93, 95, 239, 1);
  margin-bottom: 4px;
  width: 127px;
`
const CanvasText = styled.p`
  font-size: 12px;
  line-height: 15px;
  width: 106px;
  padding: 2px;
  color: rgba(107, 114, 128, 1)
`

function CanvasEmpty() {
    return (
        <>
            <CanvasImg src="/img/field.png" alt="drop-icon-field"/>
            <CanvasTitle>Перетащите сюда</CanvasTitle>
            <CanvasText>любой элемент из левой панели</CanvasText>
        </>
    );
}

export default CanvasEmpty;