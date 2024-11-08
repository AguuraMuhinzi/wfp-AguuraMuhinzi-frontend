import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/user_slice';
import  cooperativeDetailsReducer from './Slices/cooperative/coop_details';
import academyDetailsReducer from './Slices/academy/academy_details'
const store = configureStore({
  reducer: {
    user: userReducer,
    cooperative: cooperativeDetailsReducer, 
    academy : academyDetailsReducer,
  },
});

export default store;
