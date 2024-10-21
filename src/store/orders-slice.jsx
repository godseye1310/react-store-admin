import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const initialState = {
	ordersList: [],
};

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setOrdersList: (state, action) => {
			state.ordersList = action.payload;
		},
		updateOrder: (state, action) => {
			// console.log(action.payload);

			const index = state.ordersList.findIndex(
				(order) => order.id === action.payload.id
			);
			if (index !== -1) {
				state.productsList[index] = action.payload;
			}
		},
	},
});

export const { setOrdersList, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const handleFetchOrders = () => async (dispatch) => {
	try {
		const productsRef = collection(db, "orders");
		const querySnapshot = await getDocs(productsRef);
		const ordersList = [];

		querySnapshot.forEach((doc) => {
			const orderData = doc.data();

			// Safely convert Firestore Timestamp to a serializable ISO string
			const timeStamp = orderData.timeStamp
				? orderData.timeStamp.toDate().toLocaleDateString() // Convert if exists
				: null; // If no timeStamp, just set it as null

			ordersList.push({
				id: doc.id,
				...orderData,
				timeStamp,
			});
		});

		dispatch(setOrdersList(ordersList));
	} catch (error) {
		console.log(error);
	}
};

export const handleUpdateOrderStatus =
	(updatedData, id) => async (dispatch) => {
		try {
			const docRef = doc(db, "orders", id);
			await updateDoc(docRef, updatedData);
			dispatch(updateOrder({ id, ...updatedData }));
			return true;
		} catch (err) {
			console.log(err);
			throw new Error(
				"Error Updating product to Firestore: " + err.message
			);
		}
	};
