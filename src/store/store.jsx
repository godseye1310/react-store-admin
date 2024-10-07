import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-Slice";

const store = configureStore({
	reducer: {
		authState: authSlice,

		// other reducers
	},
});

export default store;
