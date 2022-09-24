import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import usersListReducer from './userListSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    usersList: usersListReducer,
  },
});

export default store;
