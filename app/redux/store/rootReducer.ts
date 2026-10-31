import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";

const rootReducer = combineReducers({
  productSlice: productReducer,
});

export default rootReducer;
