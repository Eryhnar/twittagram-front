import { createSlice } from '@reduxjs/toolkit';

export const detailSlice = createSlice({
    name: "detail",
    initialState: {
        details: {}
    },
    reducers: {
        saveDetails: (state, action) => {
            state.details = action.payload;
        }
    }

});

export const { saveDetails } = detailSlice.actions;

export const detailData = (state) => state.detail;

export default detailSlice.reducer;