import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/Form/Form";
import { useParams } from "react-router-dom";
import { handleUpdateProduct } from "../../store/productActions-thunk";

const ProductInfo = () => {
	const dispatch = useDispatch();
	const { productId } = useParams();
	const { productsList } = useSelector((state) => state.products); // Get products from Redux store

	const product = productsList.find((prod) => prod.id === productId);
	// console.log(product);

	const updateProductHandler = async (formData) => {
		try {
			const updatedProduct = {
				...formData,
				price: +formData.price,
				stock: +formData.stock,
				imageUrls: product.imageUrls, // Keep the same image URLs
			};

			// console.log("Updated product data:", updatedProduct);

			// Dispatch update action to update product
			await dispatch(handleUpdateProduct(updatedProduct, product.id));

			console.log("Product updated successfully!");
		} catch (err) {
			console.error("Error updating product:", err);
			throw new Error("Failed to update product.");
		}
	};

	return (
		<section>
			<div>
				<h1 className="text-3xl font-poppins text-gray-600 dark:text-gray-300 font-bold mb-5">
					Product Info : {product?.productName}
				</h1>

				<Form
					productData={product}
					isUpdate={true}
					handleFormSubmit={updateProductHandler}
				/>
			</div>
		</section>
	);
};

export default ProductInfo;
