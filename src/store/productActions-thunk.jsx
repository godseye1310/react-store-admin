import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
	addProduct,
	deleteProduct,
	setProductsList,
	updateProduct,
} from "./product-slice";

export const handleAddProduct = (newProductData) => async (dispatch) => {
	try {
		// Add product to Firestore
		const newProductRef = await addDoc(
			collection(db, "products"),
			newProductData
		);
		// Add the new product's ID to the data
		const newProductWithId = { id: newProductRef.id, ...newProductData };
		dispatch(addProduct(newProductWithId)); // Dispatch success action

		// Return a success flag
		return true; // Indicating that the product was added successfully
	} catch (err) {
		console.log("Error adding product: ", err);
		// Propagate the error upwards
		throw new Error("Error adding product to Firestore: " + err.message);
	}
};

export const handleFetchProducts = () => async (dispatch) => {
	try {
		const productsRef = collection(db, "products");
		const querySnapshot = await getDocs(productsRef);
		const productsList = [];

		querySnapshot.forEach((doc) => {
			productsList.push({ id: doc.id, ...doc.data() });
		});

		dispatch(setProductsList(productsList));
	} catch (error) {
		console.log(error);
	}
};

export const handleUpdateProduct = (updatedData, id) => async (dispatch) => {
	try {
		const docRef = doc(db, "products", id);
		await updateDoc(docRef, updatedData);
		dispatch(updateProduct({ id, ...updatedData }));
		return true;
	} catch (err) {
		console.log(err);
		throw new Error("Error Updating product to Firestore: " + err.message);
	}
};

export const handleDeleteProduct = (id) => async (dispatch) => {
	try {
		const docRef = doc(db, "products", id);
		await deleteDoc(docRef);
		console.log("Product deleted successfully");

		dispatch(deleteProduct(id));
	} catch (err) {
		console.log(err);
	}
};
