// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import reducer from "./reducers";

// const store = createStore(reducer, applyMiddleware(thunk));

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/usersSlice";

export const store = configureStore({ reducer: userReducer });
