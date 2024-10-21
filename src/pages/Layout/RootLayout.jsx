// import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleFetchProducts } from "../../store/productActions-thunk";
import { handleFetchOrders } from "../../store/orders-slice";

const RootLayout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(handleFetchProducts());
		dispatch(handleFetchOrders());
	}, [dispatch]);

	return (
		<main className=" w-full relative flex flex-col">
			<Navbar />
			<Sidebar />
			<div className="relative p-4 sm:ml-64 min-h-screen flex flex-col dark:bg-gray-900">
				<div className="flex-1 py-4 px-3 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 dark:bg-gray-900">
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default RootLayout;
