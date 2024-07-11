// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 1,
      pic: "https://robohash.org/user1",
      name: "User 1",
      username: "user1",
      email: "user1@example.com",
      address: {
        street: "123 Street",
        city: "City A",
      },
      phone: "123-456-7890",
    },
    {
      id: 2,
      pic: "https://robohash.org/user2",
      name: "User 2",
      username: "user2",
      email: "user2@example.com",
      address: {
        street: "456 Avenue",
        city: "City B",
      },
      phone: "234-567-8901",
    },
    {
      id: 3,
      pic: "https://robohash.org/user3",
      name: "User 3",
      username: "user3",
      email: "user3@example.com",
      address: {
        street: "789 Road",
        city: "City C",
      },
      phone: "345-678-9012",
    },
  ],

  isOpen: false,

};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    openForm: (state) => {
      state.isOpen = true;
    },
    closeForm: (state) => {
      state.isOpen = false;
    },
  },
});

export const { addUser, openForm, closeForm } = userSlice.actions;
export default userSlice.reducer;
