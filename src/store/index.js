
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clients/reducer';

const store = configureStore({
  reducer: { clients: clientsReducer },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
