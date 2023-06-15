import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    displayName: null,
    email: null,
    userName: null,
    role: null,
    id: null,

    provider: null,
    signer: null,
    address: null,
    account: null,
    isWalletConnected: false
}

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setUsername: (state, action) => {
            state.userName = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },

        setProvider: (state, action) => {
            state.provider = action.payload;
        },
        setSigner: (state, action) => {
            state.signer = action.payload;
        },
        setAddress: (state,action) => {
            state.address = action.payload;
        },
        setAccount: (state,action) => {
            state.account = action.payload;
        },
        setIsWalletConnected: (state, action) => {
            state.isWalletConnected = action.payload;
        },
    }
});

export const {setIsLoading, setDisplayName, setEmail, setUsername, setRole, setId, setProvider,setSigner,setAddress,setAccount, setIsWalletConnected} = userInfoSlice.actions;
export default userInfoSlice.reducer;