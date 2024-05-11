import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userSlice';
import deviceReducer from './reducer/deviceSlice';
import recordReducer from './reducer/recordSlice';
export const store = configureStore({
  reducer: {
      // ... 
      user: userReducer,
      device: deviceReducer,
      record: recordReducer
  }
})

