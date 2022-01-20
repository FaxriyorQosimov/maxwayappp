import {configureStore} from '@reduxjs/toolkit';
import food from './Redusers/ReduserFoods.jsx'
export default configureStore ({
    reducer: {food}
})