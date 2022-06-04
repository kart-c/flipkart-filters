import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFilter } from 'context/FilterContext';
import styles from './ProductListing.module.css';

const ProductListing = () => {
	const [products, setProducts] = useState([]);
	const {
		filterState: { idealFor, brand, sizes },
	} = useFilter();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get('products.json');
				if (response.status === 200) {
					setProducts(response.data.products);
				}
			} catch (error) {
				console.error('ERROR', error);
			}
		};
		fetchProducts();
	}, []);

	const genderFilter =
		idealFor.length > 0
			? products.filter((product) => idealFor.includes(product.idealFor))
			: products;

	const brandFilter =
		brand.length > 0
			? genderFilter.filter((product) => brand.includes(product.brand))
			: genderFilter;

	const sizesFilter =
		sizes.length > 0
			? brandFilter.filter((product) => product.sizes.some((item) => sizes.includes(item)))
			: brandFilter;

	return (
		<>
			<ul className={styles.products}>
				{sizesFilter.length > 0 ? (
					sizesFilter.map((product) => (
						<li key={product.id}>
							<article className={styles.productCard}>
								<img src={product.img} alt={product.name} />
								<div className={styles.productInfo}>
									<h4>
										{product.name} | <span>{product.brand}</span>
									</h4>
									<span className={styles.sizesTitle}>Sizes</span>
									{product.sizes.map((size) => (
										<span key={size} className={styles.sizes}>
											{size}
										</span>
									))}
									<div>Price: {product.price}</div>
								</div>
							</article>
						</li>
					))
				) : (
					<div>No products Found</div>
				)}
			</ul>
		</>
	);
};

export { ProductListing };
