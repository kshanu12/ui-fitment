import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/usersSlice";

export const store = configureStore({ reducer: userReducer });
