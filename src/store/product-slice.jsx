import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "products",
	initialState: {
		productsList: [],
	},
	reducers: {
		// Action for adding a product locally in Redux
		addProduct(state, action) {
			state.productsList.push(action.payload);
			state.loading = false;
		},

		// Action for Setting the productList
		setProductsList: (state, action) => {
			state.productsList = action.payload;
		},
		// Action for updating a product
		updateProduct: (state, action) => {
			const index = state.productsList.findIndex(
				(product) => product.id === action.payload.id
			);
			if (index !== -1) {
				state.productsList[index] = action.payload;
			}
		},
		// Action for deleting a product
		deleteProduct: (state, action) => {
			state.productsList = state.productsList.filter(
				(product) => product.id !== action.payload.id
			);
		},
	},
});

export const { addProduct, setProductsList, updateProduct, deleteProduct } =
	productSlice.actions;
export default productSlice.reducer;
