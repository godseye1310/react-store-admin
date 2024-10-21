// import React from "react";
import { FaShippingFast, FaWarehouse } from "react-icons/fa";
import { IoSettings, IoStatsChart } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { RiDashboardFill, RiLogoutBoxRLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
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
							end
							className={({ isActive }) =>
								`flex items-center p-2 rounded-lg ${isActive ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 " : "text-gray-500 hover:text-gray-900   dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`
							}
						>
							<RiDashboardFill className="flex-shrink-0 w-5 h-5 transition duration-75" />
							<span className="flex-1 ms-3 whitespace-nowrap">
								Dashboard
							</span>
							<span className=" items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 hidden">
								Pro
							</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/admin/orders"
							data-drawer-target="logo-sidebar"
							data-drawer-dismiss="logo-sidebar"
							className={({ isActive }) =>
								`flex items-center p-2 rounded-lg ${isActive ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 " : "text-gray-500 hover:text-gray-900   dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`
							}
						>
							<FaShippingFast className="flex-shrink-0 w-5 h-5 transition duration-75" />
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
							className={({ isActive }) =>
								`flex items-center p-2 rounded-lg ${isActive ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 " : "text-gray-500 hover:text-gray-900   dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`
							}
						>
							<FaWarehouse className="flex-shrink-0 w-5 h-5 transition duration-75" />
							<span className="flex-1 ms-3 whitespace-nowrap">
								Products
							</span>
						</NavLink>
					</li>
					<li>
						<div
							data-drawer-target="logo-sidebar"
							data-drawer-dismiss="logo-sidebar"
							className="flex items-center p-2 rounded-lg text-gray-500 hover:text-gray-900   dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							<IoStatsChart className="flex-shrink-0 w-5 h-5 transition duration-75" />
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
							className={({ isActive }) =>
								`flex items-center p-2 rounded-lg ${isActive ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 " : "text-gray-500 hover:text-gray-900   dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`
							}
						>
							<MdAccountCircle className="flex-shrink-0 w-5 h-5 transition duration-75" />
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
							className={({ isActive }) =>
								`flex items-center p-2 rounded-lg ${isActive ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 " : "text-gray-500 hover:text-gray-900   dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`
							}
						>
							<IoSettings className="flex-shrink-0 w-5 h-5 transition duration-75" />

							<span className="flex-1 ms-3 whitespace-nowrap">
								Settings
							</span>
						</NavLink>
					</li>

					<li>
						<button
							onClick={handleLogOut}
							className="flex items-center py-2 pl-2 pr-5 w-full rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-red-500 dark:hover:bg-red-500/90 "
						>
							<RiLogoutBoxRLine className="flex-shrink-0 w-5 h-5 transition duration-75" />
							<span className=" ms-3 whitespace-nowrap">
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
