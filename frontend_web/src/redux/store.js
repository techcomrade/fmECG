import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userSlice';
import deviceReducer from './reducer/deviceSlice';

export const store = configureStore({
  reducer: {
      // ... 
      user: userReducer,
      device: deviceReducer
  }
})