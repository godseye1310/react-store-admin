import { productInputs } from "../../constants/form-labels";
import { VscLoading } from "react-icons/vsc";
import { IoIosCloudDone } from "react-icons/io";
import { useEffect, useState } from "react";
import ImgDummy from "../UI/ImgDummy";
import ImgDisplay from "../UI/ImgDisplay";
import ImgFileInput from "../UI/ImgFileInput";
import { BiEditAlt } from "react-icons/bi";

const Form = ({
	handleFormSubmit,
	perc,
	productData = {},
	isUpdate = false,
}) => {
	const [formData, setFormData] = useState({});
	const [img, setImg] = useState(null);
	//
	const [isLoading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState(""); // Error state
	//
	const [isformDisabled, setIsformDisabled] = useState(
		isUpdate ? true : false
	);

	// Populate Product data when in editing mode
	useEffect(() => {
		if (isUpdate && productData?.id) {
			setFormData({
				productName: productData?.productName,
				brand: productData?.brand,
				price: productData?.price,
				category: productData?.category,
				stock: productData?.stock,
				description: productData?.description,
			});
		}
	}, [isUpdate, productData]);

	const handleInputChange = (event) => {
		const id = event.target.id;
		const value = event.target.value;

		setFormData({ ...formData, [id]: value });
	};

	// Form submission handler
	const formSubmissionHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		setSuccessMessage("");
		setErrorMessage("");

		try {
			// Calls the add/update function
			await handleFormSubmit(formData, img);
			setSuccessMessage(
				isUpdate
					? "Product updated successfully!"
					: "Product Added successfully!"
			);

			// Reset form only if adding a new product
			if (!isUpdate) {
				e.target.reset();
				setImg(null);
				setFormData({});
			}
			if (isUpdate) {
				setIsformDisabled(true);
			}
		} catch (error) {
			setErrorMessage(error.message);
		} finally {
			setLoading(false);
			setTimeout(() => setSuccessMessage(""), 1500);
			setTimeout(() => setErrorMessage(""), 1500);
		}
	};

	//Form
	return (
		<div className="main">
			<form
				onSubmit={formSubmissionHandler}
				className="w-full max-w-[1440px] p-6 shadow-lg shadow-gray-300 rounded-lg flex flex-col bg-neutral-100 dark:bg-slate-900 dark:text-gray-100 dark:shadow-white/10 overflow-x-auto"
			>
				<div className="flex flex-wrap -mx-3 mb-6 gap-8 items-start flex-row-reverse">
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
											value={formData[input.id] || ""}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 disabled:opacity-50 "
											placeholder={input.placeholder}
											required
											disabled={isformDisabled}
										/>
									)}

								{input.id === "category" && (
									<select
										id={input.id}
										onChange={handleInputChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 disabled:opacity-50"
										required
										// defaultValue="" // when onAdd
										value={formData[input.id] || ""}
										// when inonUpadate
										disabled={isformDisabled}
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
										value={formData[input.id] || ""}
										onChange={handleInputChange}
										rows="8"
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 disabled:opacity-50"
										placeholder={input.placeholder}
										required
										disabled={isformDisabled}
									></textarea>
								)}
							</div>
						))}
					</div>

					<div className="flex-1 pt-5 max-sm:min-w-full">
						<div
							className={`group w-full min-w-80 max-xs:min-w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600  ${isUpdate ? "opacity-35" : "opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
						>
							<ImgFileInput
								onChange={(e) => setImg(e.target.files[0])}
								disabled={isUpdate}
							/>
						</div>

						<p className="mt-5 p-5 text-xs text-center text-gray-500 dark:text-gray-400">
							{!isUpdate && "Upload"} Product Images
						</p>

						{!isUpdate && <ImgDummy img={img} perc={perc} />}
						{isUpdate && (
							<ImgDisplay imgArr={productData?.imageUrls} />
						)}
					</div>
				</div>
				<div className="flex flex-col justify-end">
					<div className="flex justify-end gap-10 mt-4 sm:mt-6">
						{isUpdate && (
							<button
								type="button"
								onClick={() =>
									setIsformDisabled((prev) => !prev)
								}
								className="text-sm w-36 font-poppins font-semibold px-3 py-2 text-gray-500 hover:text-amber-500 outline-none ring-1 ring-amber-500 rounded-lg inline-flex items-center justify-center"
							>
								<BiEditAlt size={20} />
								Edit Product
							</button>
						)}

						<button
							type="submit"
							disabled={isformDisabled}
							className="inline-flex w-40 items-center justify-center px-5 py-2.5  text-sm font-medium  text-white bg-teal-700 rounded-lg focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-900 hover:bg-teal-800 self-end disabled:opacity-30 outline-none"
						>
							{isLoading ? (
								<p className="inline-flex gap-2 items-center justify-center animate-pulse">
									Uploading...
									<span>
										<VscLoading className="w-5 h-5 ml-2 animate-spin texr-teal-500" />
									</span>
								</p>
							) : (
								<p className="text-center">
									{isUpdate
										? "Update Product"
										: "Add Product +"}
								</p>
							)}
						</button>
					</div>

					<div className="inline-flex justify-end py-4 h-20">
						{successMessage && (
							<p className="outline outline-1 h-10 outline-green-500 p-2 inline-flex gap-2 rounded-lg text-green-500 font-semibold animate-pulse">
								{successMessage}
								<span>
									<IoIosCloudDone className="w-5 h-5" />
								</span>
							</p>
						)}
						{errorMessage && (
							<p className="outline outline-1 h-10 outline-red-500 p-2 rounded-lg text-red-500 animate-pulse">
								{errorMessage}
							</p>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default Form;
