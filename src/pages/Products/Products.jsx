// import React from "react";
import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { useSelector } from "react-redux";

const Products = () => {
	const { productsList } = useSelector((state) => state.products);
	return (
		<div>
			<div className="flex justify-between items-center max-w-7xl">
				<h1 className="text-3xl font-poppins text-gray-600 dark:text-slate-gray font-bold mb-5">
					Products
				</h1>
				<Link
					to="/admin/products/new"
					className="relative  p-0.5 mb-2 me-2 overflow-hidden text-base text-blue-700 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 cursor-pointer"
				>
					<p className="relative inline-flex items-center justify-center px-5 py-2 font-[800] font-palanquin transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Add New{" "}
						<span>
							<GoPlus
								className="w-5 h-5 ml-1.5 "
								style={{ strokeWidth: 1.5 }}
							/>
						</span>
					</p>
				</Link>
			</div>
			<Table products={productsList} />
		</div>
	);
};

export default Products;
