
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

/*
Export showing a error check it.

import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,

    },
});

export default store;
 */