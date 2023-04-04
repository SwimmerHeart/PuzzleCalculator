import './App.css';
import styled from 'styled-components';
import React, {useState} from "react";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import SwitchElement from "./components/SwitchElement";
import PaletteElement from "./components/PaletteElement";
import CanvasElement from "./components/CanvasElement";
import {IDroppable, IpaletteItem, TIsDrag, TpaletteBlock} from "./types/types";
import CanvasElement2 from "./components/CanvasElement2";
import PaletteElement2 from "./components/PaletteElement2";

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
    const [mode, setMode] = useState(false)
    const [isDrag, setIsDrag] = useState<TIsDrag>({
        'block-display': false,
        'block-operands': false,
        'block-numbers': false,
        'block-result': false
    })
    const [boards, setBoards] = useState<any>({[uuidv4()]: []})
    const paletteBlock = [
        {
            typeButton: 'block-display',
            text: [0],
            classes: 'display',
            id: uuidv4()
        },
        {
            typeButton: 'block-operands',
            text: ['/', '*', '-', '+'],
            classes: 'operand',
            id: uuidv4()
        },
        {
            typeButton: 'block-numbers',
            text: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','],
            classes: 'number',
            id: uuidv4()
        },
        {
            typeButton: 'block-result',
            text: ['='],
            classes: 'number number-result',
            id: uuidv4()
        },

    ]

    const [currentValue, setCurrentValue] = useState('0')
    const [prevValue, setPrevValue] = useState('')
    const [sign, setSign] = useState<string | number>('')
    const [overwrite, setOverwrite] = useState(true)

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
    const copy = (source:TpaletteBlock, destination:any,
                  droppableSource:IDroppable, droppableDestination:IDroppable) => {
        console.log('==> dest', destination);
        // console.log('==> source', source);
        // console.log('==> 1', source[droppableSource.index].typeButton);
        // console.log('==> droppableSource', droppableSource);
        console.log('==> droppableDestination', droppableDestination);
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
        console.log('item', item.typeButton)

        setIsDrag({...isDrag, [item.typeButton]: true})

        if(droppableSource.index === 0){
            droppableDestination.index = 0
            destClone.splice(droppableDestination.index, 0, {...item, id: uuidv4()})
        } else{
            if(droppableDestination.index === 0 ){
                droppableDestination.index = 1
            }
            destClone.splice(droppableDestination.index, 0, {...item, id: uuidv4()});
        }
        //добавляем выбранный элемент и обновляем ему id
        // destClone.splice(droppableDestination.index, 0, {...item, id: uuidv4()});
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

        console.log('==> result', result);
        console.log('==> source', source);
        console.log('==> destination', destination);

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

    const calculate = () => {
        console.log('prevValue', prevValue, 'currentValue', currentValue)

        let prev:number = parseFloat(prevValue.replace(',', '.'))
        let curr:number = parseFloat(currentValue.replace(',', '.'))
        console.log('prev', prev, 'curr', curr)

        if(!prevValue || !sign) return currentValue

        let result
        switch(sign){
            case '+': result = prev + curr
                break
            case '-': result = prev - curr
                break
            case '*': result = prev * curr
                break
            case '/':
                if(curr === 0){
                    result = 'Не определено'
                    setPrevValue('')
                    setCurrentValue('')
                    setSign('')
                }
                else{
                    result = prev / curr
                }
                break
        }
        if(result) result.toString().replace('.', ',')
        console.log('prev', prev, 'curr', curr, 'result', result)
        return result
    }
    const equals = () =>{
        const value = calculate()
        setCurrentValue(`${value}`)
        setPrevValue('')
        setSign('')
        setOverwrite(true)

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
    const actionFromKeys = (item:IpaletteItem, number:string | number) => {
        if(!mode && item.typeButton === 'block-display'){
            return
        }
        if(!mode && item.typeButton === 'block-numbers'){
            console.log('currentValue.length > 4', currentValue.length)
            if(currentValue.length > 17) {
                setCurrentValue(`${currentValue}`)
                return
            }
            //убираем 00 в начале
            if(currentValue[0] === '0' && number === '0' && currentValue.length === 1) {
                return
            }
            if(currentValue[0] === '0' && number !== ',') {
                setCurrentValue(`${currentValue.slice(1)}${number}`)
                return
            }
            //убираем лишние запятые
            if(currentValue.includes(',') && number === ',') return
            //записываем дробное число
            if(overwrite && number !== ','){
                setCurrentValue(`${number}`)
            }
            else{
                setCurrentValue(`${currentValue}${number}`)
            }
            setOverwrite(false)
        }
        else if(!mode && item.typeButton === 'block-operands') {
            // if(prevValue){
            //     const value = calculation()
            //     setCurrentValue(`${value}`)
            //     setPrevValue(`${value}`)
            // }
            // else{
            setPrevValue(currentValue)
            // }
            setSign(number)
            setOverwrite(true)
        }
        else if(!mode && item.typeButton === 'block-result'){
            equals()
        }
    }

    return (
        <Container>
            <SwitchElement mode={mode} toggleMode={toggleMode}/>
            <DragDropContext onDragEnd={onDragEnd}>
                {mode && <PaletteElement2 paletteBlock={paletteBlock} isDrag={isDrag}/>}
                <CanvasElement2 boards={boards}
                                mode={mode}
                                removeButtons={removeButtons}
                                actionFromKeys={actionFromKeys}
                                currentValue={currentValue}
                />
            </DragDropContext>
        </Container>
    );
}

export default App;
