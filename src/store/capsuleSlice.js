import { createSlice } from "@reduxjs/toolkit";
import { getCapsule } from "../API";

export const capsuleSlice = createSlice({
  name: 'capsule',
  initialState: {
    capsuleList: [],
    status: [],
  },
  reducers: {
    setCapsuleList: (state, action) => {
      state.capsuleList = action.payload;
      state.status = [
        ...new Set(state.capsuleList.map((capsule) => capsule.status)),
      ];
    },
  },
});

export const { setCapsuleList } = capsuleSlice.actions;

export const getCapsuleList = () => async (dispatch) => {
  try {
    const resp = await getCapsule();
    dispatch(setCapsuleList(resp));
  } catch (error) {
    console.error("Error fetching capsule list:", error);
  }
};

export default capsuleSlice.reducer;
