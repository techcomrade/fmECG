import { createSlice } from "@reduxjs/toolkit";

export class UserModel{
    id!: String;
    name!: String;
}

interface UserState {
    model: UserModel;
}

const initialState: UserState = {
    model: new UserModel()
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        test: (state) => {
            console.log(state);
        }
    }
})

export default userSlice.reducer;