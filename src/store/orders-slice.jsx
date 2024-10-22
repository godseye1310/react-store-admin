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
		updateOrderStatus: (state, action) => {
			const { id: updateOrderId, orderStatus } = action.payload;

			const updateOrder = state.ordersList.find(
				(order) => order.id === updateOrderId
			);
			if (updateOrder) {
				updateOrder.orderStatus = orderStatus;
			}
		},
	},
});

export const { setOrdersList, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;

export const handleFetchOrders = () => async (dispatch) => {
	try {
		const productsRef = collection(db, "orders");
		const querySnapshot = await getDocs(productsRef);
		const ordersList = [];

		querySnapshot.forEach((doc) => {
			const orderData = doc.data();

			// Safely convert Firestore Timestamp to a serializable string
			const timeStamp = orderData.timeStamp
				? orderData.timeStamp.toDate().toISOString()
				: null;

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
	(orderId, newStatus) => async (dispatch) => {
		try {
			// Create a reference to the order document
			const orderRef = doc(db, "orders", orderId);
			// Update the orderStatus field in the document
			await updateDoc(orderRef, { orderStatus: newStatus });

			dispatch(
				updateOrderStatus({ id: orderId, orderStatus: newStatus })
			);
		} catch (err) {
			console.log(err);
		}
	};
