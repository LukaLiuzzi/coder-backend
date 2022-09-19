import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { BASE_API_URL } from '../config';
import ProductItem from './ProductItem';

export default function ProductsContainer() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get(`${BASE_API_URL}/products`)
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
