import { createSlice } from '@reduxjs/toolkit';
import login from './authActions';

const dataStorage = localStorage.getItem('sessionData')
  ? JSON.parse(localStorage.getItem('sessionData')!)
  : null;

const initialState = {
  loading: false,
  sessionData: dataStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('sessionData');
      state.loading = false;
      state.sessionData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.sessionData = payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
