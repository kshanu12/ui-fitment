import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "idle",
  error: null,
  searchQuery: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    editUser: (state, action) => {
      const { updated } = action.payload;
      state.users = state.users.map((user) =>
        user.id === updated.id ? updated : user
      );
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    searchUser: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  editUser,
  deleteUser,
  searchUser,
} = userSlice.actions;

export const fetchUser = () => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    const response = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = response.data;
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserFailure(error.message));
  }
};

export const selectFilteredUsers = (state) => {
  const users = state.users,
    searchQuery = state.searchQuery;
  if (!searchQuery) {
    return users;
  }
  const resp = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchQuery)
    )
  );
  return resp;
};

export default userSlice.reducer;
