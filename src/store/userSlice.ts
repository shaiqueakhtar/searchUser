import {createSlice} from '@reduxjs/toolkit';

const initialState: any = [];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    select(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item: {id: any}) => item.id !== action.payload.id);
    },
  },
});

export const {select, remove} = userSlice.actions;

export default userSlice.reducer;
