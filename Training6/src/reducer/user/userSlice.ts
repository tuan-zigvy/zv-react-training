import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStatusRedux } from '../../util/enum';
import { IUserRes } from '../../util/interface';

interface IUserRedux {
  status: EStatusRedux;
  currentUser: IUserRes | null;
  users: IUserRes[];
  targetUser: IUserRes | null;
  errorMessage: string;
}
const initialState: IUserRedux = {
  status: EStatusRedux.idle,
  currentUser: null,
  users: [],
  targetUser: null,
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getMePending: (state, _action: PayloadAction<string>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },
    getUsersPending: (state) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },
    getTargetUserPending: (state, _action: PayloadAction<string>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },

    getMeSuccess: (state, action: PayloadAction<IUserRes>) => {
      state.status = EStatusRedux.succeeded;
      state.currentUser = action.payload;
      state.errorMessage = '';
    },
    getUsersSuccess: (state, action: PayloadAction<IUserRes[]>) => {
      state.status = EStatusRedux.succeeded;
      state.users = action.payload;
      state.errorMessage = '';
    },
    getTargetUserSuccess: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.succeeded;

      if (state.users.length > 0) {
        const index = state.users.findIndex((user) => user.id === action.payload);
        state.targetUser = state.users[index] || null;
      }
      state.errorMessage = '';
    },

    getMeError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Some thing wrong';
    },
    getUsersError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Some thing wrong';
    },
    getTargetUserError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Some thing wrong';
    },

    restart: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
