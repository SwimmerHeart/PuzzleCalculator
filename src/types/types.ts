import React from "react";

export interface IpaletteItem {
    typeButton: string,
    text: string[] | number[],
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
    number: string | number,
    mode: boolean,
    fontSize: boolean,
}
export type TButtonsProps = {
    item: IpaletteItem,
    currentValue: string,
    number: string | number,
    mode: boolean,
    actionFromKeys: (item:IpaletteItem, number:string | number)=>void
}
export type TCanvasProps = {
    backgroundActive: boolean,
    active : boolean
}
export type TCanvasElementProps = {
    boards: TBoards,
    mode: boolean,
    currentValue: string,
    removeButtons: (e:React.MouseEvent<HTMLDivElement, MouseEvent>, item:IpaletteItem)=>void,
    actionFromKeys: (item:IpaletteItem, number:string | number)=>void
}

export type TPaletteElementProps = {
    paletteBlock: TpaletteBlock,
    isDrag: TIsDrag
}

export interface IDroppable {
    index: number,
    droppableId: string
}


