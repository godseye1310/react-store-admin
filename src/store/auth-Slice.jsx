import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
	isLoggedIn: !!localStorage.getItem("token"),
	token: "",
	userID: "",
	currentUser: {},
};
const authSlice = createSlice({
	name: "authState",
	initialState,
	reducers: {
		login: (state, action) => {
			// console.log(action.payload);
			state.isLoggedIn = true;
			state.token = action.payload.accessToken;
			state.userID = action.payload.uid;
			state.currentUser = action.payload;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.token = "";
			state.userID = "";
			state.currentUser = {};
		},
		setCurrentuser: (state, action) => {
			state.currentUser = { ...state.currentUser, ...action.payload };
		},
	},
});

export const { login, logout, setUserProfile } = authSlice.actions;
export default authSlice.reducer;

export const fetchCurrentUser = () => async (dispatch) => {
	// Set up listener for auth state changes
	const unsubscribe = onAuthStateChanged(auth, (user) => {
		if (user) {
			// console.log(user); // Log user data to console
			const userData = {
				uid: user.uid,
				email: user.email,
				accessToken: user.accessToken,
				// other properties
				displayName: user.displayName,
				emailVerified: user.emailVerified,
				photoURL: user.photoURL,

				phoneNumber: user.phoneNumber,
				providerData: user.providerData,
			};
			dispatch(login(userData));
		} else {
			dispatch(logout());
		}
	});

	// Clean up listener when the action is called
	return () => unsubscribe();
};
