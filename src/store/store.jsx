import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-Slice";
import productSlice from "./product-slice";
import orderSlice from "./orders-slice";

const store = configureStore({
	reducer: {
		authState: authSlice,
		products: productSlice,
		orders: orderSlice,
	},
});

export default store;
