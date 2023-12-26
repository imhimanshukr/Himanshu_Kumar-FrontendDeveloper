import { configureStore } from "@reduxjs/toolkit";
import capsuleSlice from "./capsuleSlice";

export const store = configureStore({
    reducer: capsuleSlice
})