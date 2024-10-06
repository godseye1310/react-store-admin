// import React from "react";
import { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSort } from "../../hooks/use-Sort";

const Table = () => {
	const products = [
		{
			productName: "CompuLite",
			stock: 13,
			category: "Watches",
			price: 1882.67,
		},
		{
			productName: "SoundBuds",
			stock: 6,
			category: "Watches",
			price: 1194.88,
		},
		{
			productName: "CompuLite",
			stock: 53,
			category: "Smartphone",
			price: 534.13,
		},
		{
			productName: "PixelSlate",
			stock: 44,
			category: "Smartphone",
			price: 1993.67,
		},
		{
			productName: "SwiftWatch",
			stock: 24,
			category: "Watches",
			price: 176.13,
		},
		{
			productName: "SoundBuds",
			stock: 34,
			category: "Accessories",
			price: 119.74,
		},
		{
			productName: "UltraCompute",
			stock: 55,
			category: "Smartphone",
			price: 1184.53,
		},
		{
			productName: "PowerCompanion",
			stock: 67,
			category: "Accessories",
			price: 1877.45,
		},
		{
			productName: "TechMaster Pro",
			stock: 63,
			category: "Tablet",
			price: 573.73,
		},
		{
			productName: "TabX",
			stock: 43,
			category: "PC",
			price: 1639.37,
		},
		{
			productName: "TabX",
			stock: 83,
			category: "Laptop",
			price: 1775.24,
		},
		{
			productName: "CompuLite",
			stock: 61,
			category: "Watches",
			price: 306.45,
		},
		{
			productName: "CompuLite",
			stock: 25,
			category: "Laptop",
			price: 1360.96,
		},
		{
			productName: "CompuLite",
			stock: 8,
			category: "Tablet",
			price: 1396.09,
		},
		{
			productName: "PixelSlate",
			stock: 74,
			category: "PC",
			price: 1093.51,
		},
	];

	// useEffect(() => {
	// 	const tableElement = document.querySelector("#products-table");

	// 	const dt = new DataTable(tableElement, {
	// 		columns: [
	// 			{ select: 1, sortable: true, searchable: true },
	// 			{ select: 2, sortable: false, searchable: false },
	// 			{ select: 3, sortable: true, searchable: false },
	// 			{ select: 4, sortable: true, searchable: false },
	// 			{ select: 5, sortable: false, searchable: false },
	// 		],
	// 	});

	// 	return () => {
	// 		dt.destroy(); // Clean up to avoid memory leaks
	// 	};
	// }, []);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

	// Use the custom sorting hook
	const { sortedData, requestSort, sortConfig } = useSort(products);
	const isFirstRender = useRef(true);

	// Default sorting by productName on component mount
	useEffect(() => {
		if (isFirstRender.current) {
			requestSort("productName"); // Initial sort on mount
			isFirstRender.current = false; // Prevent future calls
		}
	}, [requestSort]);

	// Filter products based on search term (case-insensitive)
	const filteredProducts = sortedData.filter((product) =>
		product.productName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination logic
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	const goToNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const goToPrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	// Handle search input change
	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};

	return (
		<div>
			<div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
				<div className="pb-4 bg-white dark:bg-gray-900">
					<label htmlFor="table-search" className="sr-only">
						Search
					</label>
					<div className="relative mt-1">
						<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
							<IoMdSearch
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
							/>
						</div>
						<input
							type="text"
							id="table-search"
							value={searchTerm}
							onChange={handleSearch}
							// onChange={handleSearch} // Custom search handler
							className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search for items"
						/>
					</div>
				</div>
				<table
					id="products-table"
					className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								onClick={() => requestSort("productName")}
								className="p-4"
							>
								<div className="flex items-center">
									<input
										id="checkbox-all-search"
										type="checkbox"
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor="checkbox-all-search"
										className="sr-only"
									>
										checkbox
									</label>
								</div>
							</th>
							<th
								scope="col"
								className="px-6 py-3"
								onClick={() => requestSort("productName")}
							>
								<span className="flex items-center cursor-pointer">
									Product name
									{sortConfig?.key === "productName" &&
										(sortConfig.order === "asc"
											? " ▲"
											: " ▼")}
								</span>
							</th>
							<th
								scope="col"
								className="px-6 py-3"
								onClick={() => requestSort("stock")}
							>
								Stock
								{sortConfig?.key === "stock" &&
									(sortConfig.order === "asc" ? " ▲" : " ▼")}
							</th>
							<th
								scope="col"
								className="px-6 py-3"
								onClick={() => requestSort("category")}
							>
								Category
								{sortConfig?.key === "category" &&
									(sortConfig.order === "asc" ? " ▲" : " ▼")}
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{currentProducts.map((product, i) => (
							<tr
								key={i}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="w-4 p-4">
									<div className="flex items-center">
										<input
											id="checkbox-table-search-1"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label
											htmlFor="checkbox-table-search-1"
											className="sr-only"
										>
											checkbox
										</label>
									</div>
								</td>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{product.productName}
								</th>
								<td className="px-6 py-4">{product.stock}</td>
								<td className="px-6 py-4">
									{product.category}
								</td>
								<td className="px-6 py-4">${product.price}</td>
								<td className="px-6 py-4 flex gap-2">
									<a
										href="#"
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									>
										Edit
									</a>
									<button
										type="button"
										className="font-medium text-red-600 dark:text-red-500 hover:underline"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Pagination */}
				<nav className="flex items-center justify-between p-4">
					<span className="text-sm text-gray-500 dark:text-gray-400">
						Showing {indexOfFirstProduct + 1}-
						{Math.min(indexOfLastProduct, filteredProducts.length)}{" "}
						of {filteredProducts.length}
					</span>
					<ul className="inline-flex -space-x-px text-sm h-8">
						<li>
							<button
								onClick={goToPrevPage}
								className="px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
								disabled={currentPage === 1}
							>
								Previous
							</button>
						</li>
						<li>
							<button
								onClick={goToNextPage}
								className="px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
								disabled={currentPage === totalPages}
							>
								Next
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Table;
