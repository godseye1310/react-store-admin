// import React from 'react'

import { useState } from "react";
import Form from "../../components/Form/Form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useDispatch } from "react-redux";
import { handleAddProduct } from "../../store/productActions-thunk";

const NewProduct = () => {
	const [perc, setPerc] = useState(null);
	const dispatch = useDispatch();

	// Function to upload image and return download URL
	const uploadImage = async (imageFile) => {
		return new Promise((resolve, reject) => {
			const imageRef = ref(storage, `products/${imageFile.name}`);
			const uploadTask = uploadBytesResumable(imageRef, imageFile);

			// Track upload progress
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress.toFixed(2) + "% done");
					setPerc(progress);
				},
				(error) => {
					reject(new Error("Image upload failed: " + error.message));
				},
				async () => {
					const downloadURL = await getDownloadURL(
						uploadTask.snapshot.ref
					);
					resolve(downloadURL); // Return the download URL when upload is complete
				}
			);
		});
	};

	// Function to Add New Product
	const addNewProductHandler = async (formData, img) => {
		try {
			let imageUrls = [];
			// 1. Upload the image and get the download URL
			if (img) {
				const imageUrl = await uploadImage(img); // Await image upload function
				imageUrls.push(imageUrl); // Store the image URL
			} else {
				throw new Error("No image selected!");
			}
			// 2. Add image URLs to formData
			const newProductData = {
				...formData,
				price: +formData.price,
				stock: +formData.stock,
				imageUrls, // Include the image URL(s) in the formData
			};

			// 3. Add formData to Firestore products collection
			await dispatch(handleAddProduct(newProductData));
			console.log("Product added successfully!");
			setPerc(null);

			// Return a success flag
			return true;
		} catch (err) {
			console.log(err);
			throw new Error("Failed to add product. Please try again.");
		}
	};
	return (
		<section className="mt-1">
			<div>
				<h1 className="text-3xl font-poppins text-gray-600 dark:text-gray-300 font-bold mb-5">
					Add New Product
				</h1>

				<div>
					<Form handleFormSubmit={addNewProductHandler} perc={perc} />
				</div>
			</div>
		</section>
	);
};

export default NewProduct;
