// import React from "react";

import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { DarkThemeToggle } from "flowbite-react";
import { FaReact } from "react-icons/fa";

const Navbar = () => {
	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start rtl:justify-end">
						<button
							data-drawer-target="logo-sidebar"
							data-drawer-toggle="logo-sidebar"
							aria-controls="logo-sidebar"
							type="button"
							className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						>
							<span className="sr-only">Open sidebar</span>

							<HiMenuAlt2
								className="w-6 h-6"
								aria-hidden="true"
							/>
						</button>
						<div className="flex items-center justify-center gap-x-3 ms-2 md:me-24 ">
							<FaReact className=" h-8 w-8 text-teal-600 dark:text-teal-400 animate-spin aniduration" />
							<span className="self-center text-teal-500 text-xl font-bold font-montserrat sm:text-2xl whitespace-nowrap">
								ReactAdmin
							</span>
						</div>
					</div>
					<div className="flex items-center">
						<DarkThemeToggle className="dark:text-amber-500 text-blue-600" />
						<div className="flex items-center ms-3">
							<div>
								<button
									type="button"
									className="group flex items-center gap-2 text-sm dark:bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
									aria-expanded="false"
									data-dropdown-toggle="dropdown-user"
									data-dropdown-trigger="hover"
								>
									<span className="sr-only">
										Open user menu
									</span>
									<img
										className="w-8 h-8 rounded-full object-cover"
										src="https://s4.anilist.co/file/anilistcdn/character/large/b123217-sZaSZQGBYTcu.png"
										alt="user photo"
									/>
									<IoIosArrowDown
										className="size-4 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-50"
										strokeWidth={10}
									/>
								</button>
							</div>
							<div
								className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
								id="dropdown-user"
							>
								<div className="px-4 py-3" role="none">
									<p
										className="text-sm text-gray-900 dark:text-white"
										role="none"
									>
										Sae Chabashira
									</p>
									<p
										className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
										role="none"
									>
										sae.chabashira@admin.in
									</p>
								</div>
								<ul className="py-1" role="none">
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
										>
											Dashboard
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
										>
											Settings
										</a>
									</li>

									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
										>
											Sign out
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
