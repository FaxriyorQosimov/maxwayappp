import {createSlice} from '@reduxjs/toolkit';


const a = createSlice({
    name: 'food',
    initialState: {
        foods: '',
        productModalVizible: true,
    },
    reducers: {
        getFood: (state, action) => {
            state.foods = action.payload
        },
        changeProductModalVizible: (state, action) => {
            state.productModalVizible = action.payload
        },
    }
})
 
export const {getFood,changeProductModalVizible, onIncreaseFood,onDecreaseFood} = a.actions
export default a.reducer 