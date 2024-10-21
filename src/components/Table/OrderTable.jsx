// import React from "react";
import { useDispatch } from "react-redux";
import { handleUpdateOrderStatus } from "../../store/orders-slice";

const OrderTable = ({ ordersList }) => {
	const dispatch = useDispatch();
	const handleStatusChange = (orderId, newStatus) => {
		//
		dispatch(handleUpdateOrderStatus(orderId, newStatus));
	};
	return (
		<div className="main">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-3 py-3">
								Order Id
							</th>
							<th scope="col" className="px-3 py-3">
								Email
							</th>
							<th scope="col" className="px-3 py-3">
								Phone
							</th>
							<th scope="col" className="px-3 py-3">
								Date
							</th>
							<th scope="col" className="px-3 py-3">
								Amount
							</th>
							<th scope="col" className="px-3 py-3 w-40 ">
								Payment Method
							</th>
							<th scope="col" className="px-3 py-3">
								<span className="pl-6">Action</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{ordersList.map((order) => (
							<tr
								key={order.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="px-3 py-4">{order.id}</td>
								<th
									scope="row"
									className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{order.email}
								</th>
								<td className="px-3 py-4">{order.phone}</td>
								<td className="px-3 py-4">{order.timeStamp}</td>
								<td className="px-3 py-4">
									${order.totalPrice}
								</td>
								<td className="px-3 py-4">
									{order.paymentMethod}
								</td>

								<td className="flex items-center px-6 py-4">
									{/* Display current order status */}
									<div className="font-medium flex items-center justify-end">
										<span
											className={`text-left text-stone-100 px-3 py-1 rounded-lg w-20 ${order.orderStatus === "ordered" ? "bg-blue-500/90" : ""} ${order.orderStatus === "delivered" ? "bg-green-500/90" : ""} ${order.orderStatus === "canceled" ? "bg-red-500/90" : ""} ${order.orderStatus === "shipped" ? "bg-yellow-400/90" : ""} ${order.orderStatus === "refunded" ? "bg-purple-500/90" : ""}`}
										>
											{order.orderStatus}
										</span>

										{/* Dropdown for updating order status */}
										<div className="relative inline-block">
											<select
												value={order.orderStatus}
												onChange={(e) =>
													handleStatusChange(
														order.id,
														e.target.value
													)
												}
												className="styled-select appearance-none w-6 h-6 bg-transparent cursor-pointer"
											>
												<option value="" disabled>
													Set Status
												</option>
												{order.orderStatus !==
													"ordered" && (
													<option
														value={
															order.orderStatus
														}
													>
														{order.orderStatus}
													</option>
												)}
												<option value="shipped">
													Shipped
												</option>
												<option value="delivered">
													Delivered
												</option>
												<option value="canceled">
													Canceled
												</option>
												<option value="refunded">
													Refunded
												</option>
											</select>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderTable;
