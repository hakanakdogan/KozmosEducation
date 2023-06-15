import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    transferContract: null,
}

export const contractInfoSlice = createSlice({
    name: "contractInfo",
    initialState,
    reducers: {
        setTransferContract: (state, action) => {
            state.transferContract = action.payload;
        }
    }
});

export const {setTransferContract} = contractInfoSlice.actions;
export default contractInfoSlice.reducer;