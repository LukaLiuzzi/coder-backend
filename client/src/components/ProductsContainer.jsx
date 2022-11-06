import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BASE_API_URL } from '../config';
import ProductItem from './ProductItem';

export default function ProductsContainer() {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		axios
			.get(`${BASE_API_URL}/products`, {
				params: {
					category: searchParams.get('category'),
				},
			})
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				setError(err.response.data.message);
			});
	}, []);

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
		<>
			{products && (
				<div className='grid grid-cols-4 gap-y-6 mt-8'>
					{products.map((product) => (
						<ProductItem key={product._id} product={product} />
					))}
				</div>
			)}
		</>
	);
}
