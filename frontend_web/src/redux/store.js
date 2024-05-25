import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userSlice';
import deviceReducer from './reducer/deviceSlice';
import recordReducer from './reducer/recordSlice';
import pdaReducer from './reducer/pdaSlice';
export const store = configureStore({
  reducer: {
      // ... 
      user: userReducer,
      device: deviceReducer,
      record: recordReducer,
      pda: pdaReducer
  }
})

