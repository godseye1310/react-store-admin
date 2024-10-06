import React, { useEffect, useState } from "react";
import { productInputs } from "../../constants/form-labels";
import { IoCloudUploadOutline } from "react-icons/io5";

const Form = () => {
	const [formData, setFormData] = useState({});
	const [file, setFile] = useState();

	const handleInputChange = (event) => {
		const id = event.target.id;
		const value = event.target.value;

		setFormData({ ...formData, [id]: value });
	};

	// useEffect(() => {
	// 	console.log(file);
	// 	if (file) {
	// 		console.log(URL.createObjectURL(file));
	// 	}
	// }, [file]);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};
	return (
		<div className="main">
			<form
				onSubmit={handleFormSubmit}
				className="w-full p-6 shadow-md rounded-lg flex flex-col dark:bg-gray-900 dark:text-gray-100 overflow-x-auto"
			>
				<div className="flex flex-wrap -mx-3 mb-6 gap-8 items-center flex-row-reverse">
					<div className="flex-[2] grid gap-4 sm:grid-cols-2 sm:gap-6 min-w-96 ">
						{productInputs.map((input) => (
							<div
								key={input.id}
								className={`${input.id === "name" || input.id === "description" ? "sm:col-span-2" : ""} ${input.id === "brand" || input.id === "price" ? "w-full" : ""}`}
							>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									{input.label}
								</label>
								{!(input.id === "category") &&
									!(input.id === "description") && (
										<input
											type={input.type}
											name="name"
											id="name"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
											placeholder={input.placeholder}
											required=""
										/>
									)}

								{input.id === "category" && (
									<select
										id="category"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
									>
										<option defaultValue="">
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
										id="description"
										rows="8"
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
										placeholder={input.placeholder}
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
											setFile(e.target.files[0])
										}
										className="w-full h-10 hidden"
									/>
									<span className="text-xs font-palanquin rounded-xl bg-teal-500 text-white p-2 group-hover:bg-teal-700">
										Choose A File
									</span>
								</p>
							</label>
						</div>

						<p className="mt-5 p-5 text-xs text-center text-gray-500 dark:text-gray-400">
							Upload Products Image
						</p>

						<div className="flex items-center justify-between w-full gap-3">
							<img
								className="size-16 rounded object-cover"
								src={
									file
										? URL.createObjectURL(file)
										: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
								}
								alt="image border border-gray-200 rounded-lg dark:border-gray-800"
							/>
							<span className="text-xs font-palanquin flex-1">
								{file?.name || "Product Image title"}
							</span>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-teal-700 rounded-lg focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-900 hover:bg-teal-800 self-end"
				>
					Add product
				</button>
			</form>
		</div>
	);
};

export default Form;
