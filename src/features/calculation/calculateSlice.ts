import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {v4 as uuidv4} from "uuid";
import {CalculateState} from "../../types/types";



const initialState: CalculateState = {
    value: 0,
    mode: false,
    paletteBlock: [
        {
            typeButton: 'block-display',
            text: ['0'],
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
        }
    ],
    currentValue: '0',
    prevValue: '',
    sign: '',
    result: '',
    overwrite: true
};

export const calculateSlice = createSlice({
    name: 'calculate',
    initialState,

    reducers: {
        addDigit: (state, action: PayloadAction<string>) => {
            console.log('=>action', action)
            //убираем 00 в начале
            if (action.payload === '0' && state.currentValue === '0') return
            //убираем лишние запятые
            if (action.payload === ',' && state.currentValue.includes(',')) return
            if (state.currentValue.length > 17) return
            if(state.overwrite === false){
                state.currentValue = ''
                state.overwrite = true
            }
                if (state.currentValue[0] === '0' && action.payload !== ',' && state.currentValue.length === 1) {
                    state.currentValue = `${state.currentValue.slice(1)}${action.payload}`
                    console.log(1)
                }
                else {
                    state.currentValue = `${state.currentValue || ''}${action.payload}`
                    console.log(3)
                }
        },
        chooseOperation: (state, action: PayloadAction<string>) => {
            if (state.currentValue === '' && state.prevValue === '') return

            if (state.prevValue === '') {
                state.sign = action.payload
                state.prevValue = state.currentValue
                state.overwrite = false
            }

            state.sign = action.payload
            state.overwrite = false
        },
        addEquals: (state, action: PayloadAction<string>) => {
            if(state.prevValue === '' || state.sign === '' || state.currentValue === '') return

            let prev:number = parseFloat(state.prevValue.replace(',', '.'))
            let curr:number = parseFloat(state.currentValue.replace(',', '.'))
            //если не число
            if(isNaN(prev) || isNaN(curr)) return
            switch(state.sign){
                case '+': state.result = prev + curr
                    break
                case '-': state.result = prev - curr
                    break
                case '*': state.result = prev * curr
                    break
                case '/':
                    if(curr === 0){
                        state.result = 'Не определено'
                        state.prevValue = ''
                        state.currentValue = ''
                        state.sign = ''
                    }
                    else{
                        state.result = prev / curr
                    }
                    break
            }

            let num = state.result
            let needNonZero = 2
            function adaptiveFixed(num:number, needNonZero:number) {
                let res = Math.trunc(num);
                let frac = Math.abs(num - res);
                if (frac === 0)
                    return res;
                let res1 = res.toString()
                res1 += '.';
                let numNonZero = 0;
                while (frac !== 0 && numNonZero < needNonZero) {
                    frac *= 10;
                    const cur = Math.floor(frac);
                    res1 += cur;
                    frac -= cur;
                    if (cur !== 0)
                        numNonZero++;
                }
                return res1;
            }
            state.result = adaptiveFixed(Number(state.result), 2)
            if(action.payload !== '='){
                state.result = state.result.toString().replace('.', ',')

            }
            state.currentValue = state.result.toString().replace('.', ',')
            state.prevValue = ''
            state.sign = ''
            state.overwrite = false
        }
    },
});

export const {addDigit, chooseOperation, addEquals} = calculateSlice.actions;

export default calculateSlice.reducer;
