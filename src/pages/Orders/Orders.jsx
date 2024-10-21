// import React from 'react'
import { useSelector } from "react-redux";
import OrderTable from "../../components/Table/OrderTable";

const Orders = () => {
	const { ordersList } = useSelector((state) => state.orders);
	console.log(ordersList);

	return (
		<div>
			<h1 className="text-3xl font-poppins text-gray-600 dark:text-gray-300 font-bold mb-5">
				Orders
			</h1>
			<div>
				<OrderTable ordersList={ordersList} />
			</div>
		</div>
	);
};

export default Orders;
