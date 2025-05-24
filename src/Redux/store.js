import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/user_slice';
import  cooperativeDetailsReducer from './Slices/cooperative/coop_details';
import academyDetailsReducer from './Slices/academy/academy_details'
import productReducer from './Slices/product/product';
import OrderReducer from './Slices/order/orderSlice';
import ChatReducer from './Slices/chat/chatSlice';
import CartReducer from './Slices/order/cartSlice';
import PredictionReducer from './Slices/predictions/price_prediction';
const store = configureStore({
  reducer: {
    user: userReducer,
    cooperative: cooperativeDetailsReducer, 
    academy : academyDetailsReducer,
    product : productReducer,
    order : OrderReducer,
    chat : ChatReducer,
    cart :CartReducer,
    prediction:PredictionReducer,
  },
});

export default store;
