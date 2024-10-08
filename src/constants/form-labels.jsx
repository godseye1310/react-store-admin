export const productInputs = [
	{
		id: "productName",
		label: "Product Name",
		type: "text",
		placeholder: "Type product Name",
	},
	{
		id: "brand",
		label: "Brand",
		type: "text",
		placeholder: "Product Brand",
	},
	{
		id: "price",
		label: "Price",
		type: "text",
		placeholder: "$3999",
	},
	{
		id: "category",
		label: "Category",
		type: "text",
		placeholder: "Computers",
		options: [
			{ name: "TV" },
			{ name: "Phone" },
			{ name: "Laptop" },
			{ name: "PC" },
			{ name: "Monitor" },
			{ name: "Tablet" },
			{ name: "Watches" },
			{ name: "Accessories" },
		],
	},
	{
		id: "stock",
		label: "Stock (Qty)",
		type: "Number",
		placeholder: "Qty 99",
	},
	{
		id: "description",
		label: "Description",
		type: "text",
		placeholder: "Product description here",
	},
];
