import React from "react";

export interface IpaletteItem {
    typeButton: string,
    text: string[],
    classes: string,
    id: string
}
export type TpaletteBlock = IpaletteItem[]

export type TBoards = {
    [key:string] : TpaletteBlock
}
export type TIsDrag = {
    [key:string] : boolean
}

export type TSwitchElementProps = {
    mode: boolean,
    toggleMode: ()=>void
}
export type TModelBlockProps = {
    active: boolean
}
export interface IButtonProps {
    styleButton: string,
    number: string,
    mode: boolean,
    fontSize: boolean,
}
export type TButtonsProps = {
    item: IpaletteItem,
    currentValue: string,
    number: string,
    mode: boolean,
    actionFromKeys: (item:IpaletteItem, number:string)=>void
}
export type TCanvasProps = {
    backgroundActive: boolean,
    active : boolean
}
export type TCanvasElementProps = {
    boards: TBoards,
    mode: boolean,
    removeButtons: (e:React.MouseEvent<HTMLDivElement, MouseEvent>, item:IpaletteItem)=>void,
}

export type TPaletteElementProps = {
    paletteBlock: TpaletteBlock,
    isDrag: TIsDrag
}

export interface IDroppable {
    index: number,
    droppableId: string
}
export interface CalculateState {
    value: number,
    mode: boolean,
    paletteBlock: IpaletteItem[],
    currentValue: string,
    prevValue: string,
    sign: string,
    result: number | string,
    overwrite: boolean
}


