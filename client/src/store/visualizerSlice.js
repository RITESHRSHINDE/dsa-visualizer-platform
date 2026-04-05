import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  array: [],
  isPlaying: false,
  speed: 50, // Animation speed (delay in ms)
  status: 'idle', // 'idle' | 'running' | 'completed' | 'paused'
};

const visualizerSlice = createSlice({
  name: 'visualizer',
  initialState,
  reducers: {
    setArray: (state, action) => {
      state.array = action.payload;
    },
    updateItemStatus: (state, action) => {
      const { index, status } = action.payload;
      if (state.array[index]) {
        state.array[index].status = status;
      }
    },
    swapElements: (state, action) => {
      const { idx1, idx2 } = action.payload;
      const temp = state.array[idx1];
      state.array[idx1] = state.array[idx2];
      state.array[idx2] = temp;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
      if (action.payload) {
         state.status = 'running';
      } else if (state.status === 'running') {
         state.status = 'paused';
      }
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      if (action.payload === 'completed' || action.payload === 'idle') {
          state.isPlaying = false;
      }
    },
    resetVisualizer: (state) => {
      state.isPlaying = false;
      state.status = 'idle';
      state.array = state.array.map(item => ({ ...item, status: 'default' }));
    }
  },
});

export const { 
    setArray, 
    updateItemStatus, 
    swapElements, 
    setIsPlaying, 
    setSpeed, 
    setStatus,
    resetVisualizer 
} = visualizerSlice.actions;

export default visualizerSlice.reducer;
