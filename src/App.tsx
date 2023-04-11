import './App.css';
import styled from 'styled-components';
import React, {useState} from "react";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import SwitchElement from "./components/SwitchElement";
import PaletteElement from "./components/PaletteElement";
import CanvasElement from "./components/CanvasElement";
import {useAppSelector} from "./app/hooks";
import {IDroppable, IpaletteItem, TIsDrag, TpaletteBlock} from "./types/types";

const Container = styled.div`
    width: 686px;
    margin: 0 auto;
    background-color: #FFFFFF;
    display: grid;
    grid-template-rows: 106px 1fr;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    padding: 35px;
`


const App:React.FC = () => {

    const {paletteBlock} = useAppSelector(state=>state.calculation)
    const [mode, setMode] = useState(false)
    const [isDrag, setIsDrag] = useState<TIsDrag>({
        'block-display': false,
        'block-operands': false,
        'block-numbers': false,
        'block-result': false
    })
    const [boards, setBoards] = useState<any>({[uuidv4()]: []})

    const toggleMode = () => {
        setMode(mode => !mode)
    }
    const reorder = (list:TpaletteBlock, startIndex:number, endIndex:number) => {
        const result = Array.from(list);
        if (startIndex === 0 || endIndex === 0) {
            return result
        }


        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const copy = (source:TpaletteBlock, destination:TpaletteBlock,
                  droppableSource:IDroppable, droppableDestination:IDroppable) => {
        // console.log('==> dest', destination);
        // console.log('==> source', source);
        // console.log('==> 1', source[droppableSource.index].typeButton);
        // console.log('==> droppableSource', droppableSource);
        // console.log('==> droppableDestination', droppableDestination);
        //source - массив paletteBlock
        //destination - массив куда кладем
        //droppableSource - объект который взяли с индексом и id(droppableID + index)
        //droppableDestination - объект droppable куда положили с индексом(droppableID + index)

        //копия блоков с кнопками
        const sourceClone = Array.from(source);
        //копия блока со сборкой
        const destClone = Array.from(destination);
        //индекс элемента который взяли
        const item = sourceClone[droppableSource.index];

        setIsDrag({...isDrag, [item.typeButton]: true})

        //добавляем выбранный элемент и обновляем ему id
        if(droppableSource.index === 0){
            droppableDestination.index = 0
            destClone.splice(droppableDestination.index, 0, {...item, id: uuidv4()})
        } else{
            if(droppableDestination.index === 0 ){
                droppableDestination.index = 1
            }
            destClone.splice(droppableDestination.index, 0, {...item, id: uuidv4()});
        }
        //массив элементов которые перетянули
        return destClone;
    };
    const move = (source:TpaletteBlock, destination:TpaletteBlock,
                  droppableSource:IDroppable, droppableDestination:IDroppable) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result:any = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const onDragEnd = (result:DropResult) => {
        const {source, destination} = result;

        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                setBoards({
                    [destination.droppableId]: reorder(
                        boards[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                setBoards({
                    [destination.droppableId]: copy(
                        paletteBlock,
                        boards[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                setBoards(
                    move(
                        boards[source.droppableId],
                        boards[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    }

    const removeButtons = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,item:IpaletteItem) =>{
        const list:TpaletteBlock = boards[Object.keys(boards)[0]]
        if (mode){
            // устанавливаем флаг на drag&drop в исходном списке
            setIsDrag({...isDrag, [item.typeButton]: false})
            // удаляем из массива не нужный элемент
            setBoards({[Object.keys(boards)[0]]: list.filter(elem => elem.id !== item.id)})
        }
        else{
            e.stopPropagation()
        }
    }

    return (
        <Container>
            <SwitchElement mode={mode} toggleMode={toggleMode}/>
            <DragDropContext onDragEnd={onDragEnd}>
                {mode && <PaletteElement paletteBlock={paletteBlock} isDrag={isDrag}/>}
                <CanvasElement boards={boards}
                                mode={mode}
                                removeButtons={removeButtons}
                />
            </DragDropContext>
        </Container>
    );
}

export default App;
