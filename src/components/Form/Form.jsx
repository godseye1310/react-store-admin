import { useState } from "react";
import { productInputs } from "../../constants/form-labels";
import { IoCloudUploadOutline } from "react-icons/io5";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { handleAddProduct } from "../../store/productActions-thunk";
import { useDispatch } from "react-redux";
import { VscLoading } from "react-icons/vsc";
import { IoIosCloudDone } from "react-icons/io";

const Form = () => {
	const [formData, setFormData] = useState({});
	const [img, setImg] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [perc, setPerc] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState(""); // Error state

	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		const id = event.target.id;
		const value = event.target.value;

		setFormData({ ...formData, [id]: value });
	};

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
					console.log("Upload is " + progress + "% done");
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

	// Function to handle form submission
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setSuccessMessage("");

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
			const productData = {
				...formData,
				price: +formData.price,
				stock: +formData.stock,

				imageUrls, // Include the image URL(s) in the formData
			};

			// 3. Add formData to Firestore products collection
			await dispatch(handleAddProduct(productData));

			console.log("Product added successfully!");
			// Show success message and clear form
			setSuccessMessage("Product successfully added");
			e.target.reset();
			setFormData({});
			setImg(null);

			// Clear success message after 3 seconds
			setTimeout(() => setSuccessMessage(""), 3000);
		} catch (err) {
			console.error("Error adding product:", err);
			setErrorMessage("Failed to add product. Please try again."); // Set error message for the UI

			setTimeout(() => setErrorMessage(""), 3000);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="main">
			<form
				onSubmit={handleFormSubmit}
				className="w-full p-6 shadow-lg shadow-gray-300 rounded-lg flex flex-col bg-slate-200 dark:bg-slate-900 dark:text-gray-100 dark:shadow-white/10 overflow-x-auto"
			>
				<div className="flex flex-wrap -mx-3 mb-6 gap-8 items-center flex-row-reverse">
					<div className="flex-[2] grid gap-4 sm:grid-cols-2 sm:gap-6 max-md:min-w-full min-w-[300px]">
						{productInputs.map((input) => (
							<div
								key={input.id}
								className={`${input.id === "productName" || input.id === "description" ? "sm:col-span-2" : ""} ${input.id === "brand" || input.id === "price" ? "max-sm:col-span-1 w-full" : ""}`}
							>
								<label
									htmlFor={input.id}
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									{input.label}
								</label>
								{!(input.id === "category") &&
									!(input.id === "description") && (
										<input
											id={input.id}
											type={input.type}
											onChange={handleInputChange}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
											placeholder={input.placeholder}
											required
										/>
									)}

								{input.id === "category" && (
									<select
										id={input.id}
										onChange={handleInputChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
										required
										defaultValue=""
									>
										<option value="" disabled>
											Select category
										</option>
										{input.options.map((option) => (
											<option
												key={option.name}
												value={option.name}
											>
												{option.name}
											</option>
										))}
									</select>
								)}

								{input.id === "description" && (
									<textarea
										id={input.id}
										type={input.type}
										onChange={handleInputChange}
										rows="8"
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
										placeholder={input.placeholder}
										required
									></textarea>
								)}
							</div>
						))}
					</div>

					<div className="flex-1">
						<div className="group w-full min-w-80 h-48 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
							<label
								htmlFor="file-input"
								className="w-full h-full cursor-pointer flex items-center justify-center"
							>
								<p className="flex gap-2 items-center justify-center flex-col">
									<IoCloudUploadOutline className="text-5xl text-slate-500" />
									<input
										type="file"
										name="file"
										id="file-input"
										onChange={(e) =>
											setImg(e.target.files[0])
										}
										className="size-0.5 inline-block opacity-0"
										required
									/>
									<span className="text-xs font-medium font-palanquin rounded-xl bg-teal-500 text-white p-2 group-hover:bg-teal-700">
										Choose An Image
									</span>
								</p>
							</label>
						</div>

						<p className="mt-5 p-5 text-xs text-center text-gray-500 dark:text-gray-400">
							Upload Products Image
						</p>

						<div className="relative flex items-center justify-between w-full gap-3 rounded-lg bg-slate-100 bg-black/10 dark:bg-white/10 p-3">
							{perc > 0 && perc < 100 && (
								<div className="absolute left-1/2 -translate-x-1/2 px-6 py-3 text-sm w-[90%] backdrop-blur font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full dark:bg-blue-900/65 dark:text-blue-200">
									<p className="animate-pulse">
										Uploading Image... {perc}%
									</p>
								</div>
							)}
							<img
								className="size-16 rounded object-cover"
								src={
									img
										? URL.createObjectURL(img)
										: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
								}
								alt="image border border-gray-200 rounded-lg dark:border-gray-800"
							/>
							<span className="text-xs font-palanquin flex-1">
								{img?.name || "Product Image title"}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-end">
					<button
						type="submit"
						className="inline-flex w-40 items-center justify-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium  text-white bg-teal-700 rounded-lg focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-900 hover:bg-teal-800 self-end"
					>
						{isLoading ? (
							<p className="inline-flex gap-2 items-center justify-center animate-pulse">
								Uploading...
								<span>
									<VscLoading className="w-5 h-5 ml-2 animate-spin texr-teal-500" />
								</span>
							</p>
						) : (
							<p className="text-center">Add Product +</p>
						)}
					</button>

					<div className="inline-flex justify-end py-4 h-20">
						{successMessage && (
							<p className="outline outline-1 h-10 outline-green-500 p-2 inline-flex gap-2 rounded-lg text-green-500 font-semibold animate-pulse">
								Product Added Successfully !{" "}
								<span>
									<IoIosCloudDone className="w-5 h-5" />
								</span>
							</p>
						)}
						{errorMessage && (
							<p className="outline outline-1 h-10 outline-red-500 p-2 rounded-lg text-red-500 animate-pulse">
								Failed to add product. Please try again.
							</p>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default Form;
