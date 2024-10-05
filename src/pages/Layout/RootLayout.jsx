// import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const RootLayout = () => {
	return (
		<main className=" w-full relative">
			<Navbar />
			<Sidebar />
			<div className="relative p-4 sm:ml-64">
				<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default RootLayout;
