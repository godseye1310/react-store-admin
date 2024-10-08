import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { addProduct, setProductsList } from "./product-slice";

export const handleAddProduct = (productData) => async (dispatch) => {
	try {
		// Add product to Firestore
		const productRef = await addDoc(
			collection(db, "products"),
			productData
		);

		// Add the new product's ID to the data
		const productWithId = { id: productRef.id, ...productData };

		dispatch(addProduct(productWithId)); // Dispatch success action
	} catch (err) {
		console.log("Error adding product: ", err);
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
