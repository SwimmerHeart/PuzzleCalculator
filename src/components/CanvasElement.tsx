import React from 'react';
import {Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import CanvasEmpty from "./CanvasEmpty";
import Buttons from "./Buttons";
import {TCanvasElementProps, TCanvasProps} from "../types/types";


const Canvas = styled.div<TCanvasProps>`
  width: 243px;
  height: 448px;
  background: ${props => props.backgroundActive ? 'rgba(240, 249, 255, 1)' : '#FFFFFF'};
  border: ${props => props.active ? '2px dashed rgba(196, 196, 196, 1)' : 'none'};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.active ? 'center' : 'start'};
  align-items: center;
  text-align: center;
`
const BlockButtons = styled.div`
  display: flex;
  cursor: grab;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0
  rgba(0, 0, 0, 0.06);
  padding: 4px;
  width: 100%;
`
const CanvasBlock = styled.div`
    width: 243px;
    grid-area: 2 / 2 / 3 / 3;
    justify-self: center;
`


const CanvasElement:React.FC<TCanvasElementProps> = ({boards, mode, removeButtons, actionFromKeys, currentValue}) => {
    console.log('=>',boards)
    return (
        <CanvasBlock>
            {Object.keys(boards).map((list, i) => {
                console.log('==> list', list);
                console.log('==> boards[list]', boards[list])
                return (
                    <Droppable key={list} droppableId={list}>
                        {(provided, snapshot) => {
                            let isActive:boolean = boards[list].length === 0
                            return (
                                <Canvas active={isActive}
                                        backgroundActive={snapshot.isDraggingOver && isActive}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                >
                                    {boards[list].length ? boards[list].map(
                                            (item, index) => {
                                                console.log('==> boards[list]', boards[list])
                                                return (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                        isDragDisabled={!mode || item.typeButton === 'block-display'}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => (
                                                            <BlockButtons
                                                                className={item.typeButton}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{...provided.draggableProps.style,
                                                                    boxShadow: 'none',
                                                                    cursor: !mode ? 'auto' : 'grab'
                                                                }}
                                                                onDoubleClick={(e)=>removeButtons(e,item)}
                                                            >
                                                                {item.text.map((number, index) =>
                                                                        <Buttons key={number}
                                                                                 number={number}
                                                                                 mode={mode}
                                                                                 item={item}
                                                                                 currentValue={currentValue}
                                                                                 actionFromKeys={actionFromKeys}
                                                                        />
                                                                )}
                                                            </BlockButtons>
                                                        )}
                                                    </Draggable>
                                                )}
                                        )
                                        : provided.placeholder && <CanvasEmpty/>
                                    }
                                    {provided.placeholder}
                                </Canvas>
                            )}}
                    </Droppable>
                );
            })}
        </CanvasBlock>
    );
}

export default CanvasElement;