// import React from 'react'

import Form from "../../components/Form/Form";

const NewProduct = () => {
	return (
		<section className="mt-1">
			<div>
				<h1 className="text-3xl font-poppins text-gray-600 dark:text-gray-300 font-bold mb-5">
					Add New Product
				</h1>

				<div>
					<Form />
				</div>
			</div>
		</section>
	);
};

export default NewProduct;
