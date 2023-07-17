import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITaskRedux {
  statusNetWork: boolean;
}
const initialState: ITaskRedux = {
  statusNetWork: navigator.onLine,
};

export const networkSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateNetwork: (state, action: PayloadAction<boolean>) => {
      state.statusNetWork = action.payload;
    },
  },
});

export const networkAction = networkSlice.actions;

export default networkSlice.reducer;
