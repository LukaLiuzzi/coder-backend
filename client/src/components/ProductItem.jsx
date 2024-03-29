import axios from 'axios';
import { useState } from 'react';
import { BASE_API_URL } from '../config';

export default function ProductItem({ product }) {
	const [quantity, setQuantity] = useState(1);
	const [error, setError] = useState(null);

	const handleAddQuantity = () => {
		if (quantity < product.stock) {
			setQuantity(quantity + 1);
		} else {
			alert('No hay mas stock');
		}
	};

	const handleSubtractQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleAddToCart = (product) => {
		axios
			.post(
				`${BASE_API_URL}/cart`,

				{
					productId: product._id,
					quantity,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				setError(err.response.data.message);
			});
	};

	if (error)
		return (
			<div>
				<h1 className='text-center text-white text-2xl'>Error</h1>
				<div className='flex text-white justify-center items-center flex-col'>
					<p>{error}</p>
				</div>
			</div>
		);

	return (
		<div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 uppercase'>
			<img className='rounded-t-lg' src={product.image} alt='' />
			<div className='p-5'>
				<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
					{product.name}
				</h5>

				<p className='text-xl text-white'>Precio: {product.price}</p>
				<p className='text-xl text-white'>Stock: {product.stock}</p>

				<div className='flex items-center justify-between mt-4 bg-white'>
					<button
						className='bg-black text-white p-4'
						onClick={handleSubtractQuantity}
					>
						-
					</button>
					<p>{quantity}</p>
					<button
						className='bg-black text-white p-4'
						onClick={handleAddQuantity}
					>
						+
					</button>
				</div>
				<button
					onClick={() => handleAddToCart(product)}
					className='w-full mt-4 bg-black text-white p-4'
				>
					Agregar al carrito
				</button>
			</div>
		</div>
	);
}
