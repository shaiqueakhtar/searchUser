import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {usersMain} from '../helper/apiService';

export const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const usersList = createSlice({
  name: 'user',
  initialState: {
    data: [],
    limit: 10,
    status: STATUS.IDLE,
    searchValue: '',
    selected: false,
  },
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setPageLimit(state, action) {
      console.log('updating limit');
      if (action.payload) {
        console.log('action payload', action.payload);
        state.limit = 0;
      }
      state.limit = state.limit + 10;
    },
    setSearchUser(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const {setUsers, setStatus, setPageLimit, setSearchUser} =
  usersList.actions;

export default usersList.reducer;

// Thunks
export function fetchUsers(number) {
  return async function fetchUsersThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await usersMain.getUsers(number);
      dispatch(setUsers(response.data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
