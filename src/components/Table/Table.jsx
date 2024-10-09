// import React from "react";
import { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSort } from "../../hooks/use-Sort";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
import { useDispatch } from "react-redux";
import { handleDeleteProduct } from "../../store/productActions-thunk";

const Table = ({ products }) => {
	// console.log(products);
	const dispatch = useDispatch();

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

	const productDeleteHandler = (id) => {
		dispatch(handleDeleteProduct(id));
	};

	return (
		<div>
			<div className="relative max-w-7xl min-h-[600px] overflow-x-auto shadow-lg rounded-lg p-3 bg-neutral-100 shadow-gray-300 dark:bg-slate-900 dark:shadow-white/10">
				<div className="pb-4">
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
							className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
							<th scope="col" className="p-4">
								<div className="items-center">
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
								className="px-6 py-3 w-[300px] cursor-pointer"
								onClick={() => requestSort("productName")}
							>
								<span className="">
									Product name
									{sortConfig?.key === "productName" &&
										(sortConfig.order === "asc"
											? " ▲"
											: " ▼")}
								</span>
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-center cursor-pointer"
								onClick={() => requestSort("stock")}
							>
								Stock
								{sortConfig?.key === "stock" &&
									(sortConfig.order === "asc" ? " ▲" : " ▼")}
							</th>
							<th
								scope="col"
								className="px-6 py-3 cursor-pointer"
								onClick={() => requestSort("category")}
							>
								Category
								{sortConfig?.key === "category" &&
									(sortConfig.order === "asc" ? " ▲" : " ▼")}
							</th>
							<th scope="col" className="px-6 py-3 max-md:hidden">
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
											id={`checkbox-table-search-${i}`}
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
								</td>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[300px]"
								>
									{product.productName}
								</th>
								<td className="px-3 py-4 text-center whitespace-nowrap">
									{product.stock === 0 ? (
										<span className="bg-red-500/30 rounded-md px-1.5 py-0.5">
											Out of stock
										</span>
									) : (
										product.stock
									)}
								</td>
								<td className="px-6 py-4">
									{product.category}
								</td>
								<td className="px-6 py-4 max-md:hidden">
									${product.price}
								</td>
								<td className="px-6 py-4 flex gap-2">
									<Link
										to={`/admin/products/${product.id}`}
										className="font-medium text-blue-600 dark:hover:text-blue-500 opacity-60 hover:opacity-100"
									>
										<MdRemoveRedEye
											size={25}
											title="View"
										/>
									</Link>
									<button
										type="button"
										onClick={() =>
											productDeleteHandler(product.id)
										}
										className="font-medium text-red-600 dark:text-red-500 opacity-60 hover:opacity-100 hover:underline"
									>
										<MdDeleteForever size={25} />
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
