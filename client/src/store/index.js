import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import visualizerReducer from './visualizerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    visualizer: visualizerReducer,
  },
});
