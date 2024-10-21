// import React from "react";
// import { useSelector } from "react-redux";

const AdminPanel = () => {
	// const { currentUser } = useSelector((state) => state.authState);
	// console.log(currentUser);

	return (
		<div>
			<h1 className="text-3xl font-poppins text-gray-600 dark:text-gray-300 font-bold mb-6">
				AdminPanel
			</h1>
			<div className="grid grid-cols-3 gap-4 mb-4">
				<div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
					<p className="text-2xl text-gray-400 dark:text-gray-500">
						+
					</p>
				</div>
				<div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
					<p className="text-2xl text-gray-400 dark:text-gray-500">
						+
					</p>
				</div>
				<div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
					<p className="text-2xl text-gray-400 dark:text-gray-500">
						+
					</p>
				</div>
			</div>
			<div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
				<p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
			</div>
			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p className="text-2xl text-gray-400 dark:text-gray-500">
						+
					</p>
				</div>
				<div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p className="text-2xl text-gray-400 dark:text-gray-500">
						+
					</p>
				</div>
				<div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p className="text-2xl text-gray-400 dark:text-gray-500">
						+
					</p>
				</div>
				<div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
					<p className="text-2xl text-gray-400 dark:text-gray-500">
						+
					</p>
				</div>
			</div>
		</div>
	);
};

export default AdminPanel;
