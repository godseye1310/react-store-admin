// import React from "react";
import { FaShippingFast, FaWarehouse } from "react-icons/fa";
import { IoSettings, IoStatsChart } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { RiDashboardFill, RiLogoutBoxRLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-Slice";

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogOut = () => {
		//
		signOut(auth);
		console.log("User signed out successfully");
		// Optionally redirect or update state here
		localStorage.removeItem("token");
		navigate("/login", { replace: true });
		dispatch(logout());
	};
	return (
		<aside
			id="logo-sidebar"
			className="fixed top-0 left-0 z-40 w-64 md:w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
			aria-label="Sidebar"
		>
			<div className="flex flex-col h-full px-3 pb-8 overflow-y-auto bg-white dark:bg-gray-800">
				<ul className="space-y-2 font-medium flex flex-col flex-1">
					<li>
						<NavLink
							data-drawer-target="logo-sidebar"
							data-drawer-dismiss="logo-sidebar"
							to="/admin"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<RiDashboardFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
							<span className="flex-1 ms-3 whitespace-nowrap">
								Dashboard
							</span>
							<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
								Pro
							</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/admin/orders"
							data-drawer-target="logo-sidebar"
							data-drawer-dismiss="logo-sidebar"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<FaShippingFast
								className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								aria-hidden="true"
							/>
							<span className="flex-1 ms-3 whitespace-nowrap">
								Orders
							</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							data-drawer-target="logo-sidebar"
							data-drawer-dismiss="logo-sidebar"
							to="/admin/products"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<FaWarehouse className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
							<span className="flex-1 ms-3 whitespace-nowrap">
								Products
							</span>
						</NavLink>
					</li>
					<li>
						<div
							data-drawer-target="logo-sidebar"
							data-drawer-dismiss="logo-sidebar"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<IoStatsChart
								className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								aria-hidden="true"
							/>
							<span className="flex-1 ms-3 whitespace-nowrap">
								Stats
							</span>
						</div>
					</li>
				</ul>
				<ul className="pt-4 mt-4 space-y-2 font-medium flex flex-col">
					<li>
						<NavLink
							to="/admin/profile"
							data-drawer-target="logo-sidebar"
							data-drawer-dismiss="logo-sidebar"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<MdAccountCircle
								className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								aria-hidden="true"
							/>
							<span className="flex-1 ms-3 whitespace-nowrap">
								Profile
							</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/settings"
							data-drawer-target="logo-sidebar"
							data-drawer-dismiss="logo-sidebar"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<IoSettings
								className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								aria-hidden="true"
							/>

							<span className="flex-1 ms-3 whitespace-nowrap">
								Settings
							</span>
						</NavLink>
					</li>

					<li>
						<button
							onClick={handleLogOut}
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<RiLogoutBoxRLine
								className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								aria-hidden="true"
							/>
							<span className="flex-1 ms-3 whitespace-nowrap">
								Logout
							</span>
						</button>
					</li>
				</ul>
			</div>
		</aside>
	);
};
export default Sidebar;
