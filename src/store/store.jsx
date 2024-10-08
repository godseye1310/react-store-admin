import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-Slice";
import productSlice from "./product-slice";

const store = configureStore({
	reducer: {
		authState: authSlice,
		products: productSlice,

		// other reducers
	},
});

export default store;
