import React from 'react';
import {Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import {TPaletteElementProps} from "../types/types";

const Palette = styled.div`
  width: 243px;
  grid-area: 2 / 1 / 3 / 2;
  justify-self: center;
`
const BlockButtons = styled.div`
  display: flex;
  cursor: grab;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0
  rgba(0, 0, 0, 0.06);
  padding: 4px;
  width: 100%;
`

const PaletteElement:React.FC<TPaletteElementProps> = ({paletteBlock, isDrag}) => {
    return (
        <Droppable droppableId="ITEMS" isDropDisabled={true}>
            {(provided, snapshot) => (
                <Palette ref={provided.innerRef}
                         {...provided.droppableProps}
                >
                    {paletteBlock.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            isDragDisabled={isDrag[item.typeButton]}
                        >
                            {(provided, snapshot) => (
                                <BlockButtons className={item.typeButton}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={
                                                  {
                                                      ...provided.draggableProps.style,
                                                      opacity: isDrag[item.typeButton] ? '.5' : '1',
                                                  }
                                              }
                                >
                                    {item.text.map((number: string | number) =>
                                        <div
                                            key={number}
                                            className={number === '0' ? 'number number-zero' : item.classes}
                                        >
                                            {number}
                                        </div>
                                    )}
                                    {/*<div>{item.content}</div>*/}
                                </BlockButtons>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </Palette>
            )}
        </Droppable>
    );
}

export default PaletteElement;