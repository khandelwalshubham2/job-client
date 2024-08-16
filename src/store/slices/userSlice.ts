import { User } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/* type initialStateType = {
  isAuthenticated: boolean;
  userDetails: {
    name: string;
    id: string;
  };
}; */

const initialState = {
  isAuthenticated: false,
  userDetails: {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    profile: {
      bio: "",
      skills: [] as string[],
      resume: "",
      resumeName: "",
      profilePhoto: "",
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },
    deleteUser: () => {
      return initialState;
    },
  },
});

export default userSlice;

export const { setUser, deleteUser } = userSlice.actions;
