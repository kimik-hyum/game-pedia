import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'UI',
  initialState: {
    isMobile: window.innerWidth < 800,
    activateLnb: false,
  },
  reducers: {
    setMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setActivateLnb: (state, action: PayloadAction<boolean>) => {
      state.activateLnb = action.payload;
    },
  },
});
