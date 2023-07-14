import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EStatusRedux } from '../../util/enum';
import { ILogin } from '../../util/interface';

interface IAuth {
  status: EStatusRedux;
  isSignIn: boolean;
  isInitialState: boolean;
  errorMessage: string;
}
const initialState: IAuth = {
  status: EStatusRedux.idle,
  isSignIn: false,
  isInitialState: false,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsInitialState: (state) => {
      state.isInitialState = true;
    },
    signInPending: (state, _action: PayloadAction<ILogin>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },
    signOutPending: (state) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },

    signInSuccess: (state) => {
      state.status = EStatusRedux.succeeded;
      state.isSignIn = true;
      state.isInitialState = true;
    },
    signOutSuccess: (state) => {
      state.status = EStatusRedux.succeeded;
      state.errorMessage = '';
      state.isSignIn = false;
    },

    signInError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Some thing wrong';
      state.isInitialState = true;
    },
    signOutError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Some thing wrong';
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
