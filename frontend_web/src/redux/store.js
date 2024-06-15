import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userSlice';
import deviceReducer from './reducer/deviceSlice';
import recordReducer from './reducer/recordSlice';
import statisticReducer from './reducer/statisticSlice';
import pdaReducer from './reducer/pdaSlice';
import aiChatReducer from './reducer/aiChatSlice';
export const store = configureStore({
  reducer: {
      // ... 
      user: userReducer,
      device: deviceReducer,
      record: recordReducer,
      statistic: statisticReducer,
      pda: pdaReducer,
      aiChat: aiChatReducer,
  }
})

