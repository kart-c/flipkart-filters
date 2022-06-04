import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFilter } from 'context/FilterContext';
import styles from './Filters.module.css';

const Filters = () => {
	const [brands, setBrands] = useState([]);
	const {
		filterDispatch,
		filterState: { idealFor, brand: itemBrand, sizes },
	} = useFilter();

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await axios.get('filters.json');
				if (response.status === 200) {
					setBrands(response.data.brand);
				}
			} catch (error) {
				console.error('ERROR', error);
			}
		};
		getCategories();
	}, []);

	const genderFilterHandler = (gender) =>
		filterDispatch({ type: 'GENDER_FILTER', payload: gender });

	return (
		<aside className={styles.filters}>
			<div className={styles.filtersHeading}>
				<h3>Filters</h3>
				<button onClick={() => filterDispatch({ type: 'CLEAR' })}>Clear</button>
			</div>
			<div>
				<span className={styles.filterTitle}>Sizes</span>
				<div className={styles.filterContainer}>
					<input
						type="checkbox"
						id="S"
						checked={sizes.includes('S')}
						onChange={() => filterDispatch({ type: 'SIZES_FILTER', payload: 'S' })}
					/>
					<label htmlFor="S">S</label>
				</div>
				<div className={styles.filterContainer}>
					<input
						type="checkbox"
						id="M"
						checked={sizes.includes('M')}
						onChange={() => filterDispatch({ type: 'SIZES_FILTER', payload: 'M' })}
					/>
					<label htmlFor="M">M</label>
				</div>
				<div className={styles.filterContainer}>
					<input
						type="checkbox"
						id="L"
						checked={sizes.includes('L')}
						onChange={() => filterDispatch({ type: 'SIZES_FILTER', payload: 'L' })}
					/>
					<label htmlFor="L">L</label>
				</div>
				<div className={styles.filterContainer}>
					<input
						type="checkbox"
						id="XL"
						checked={sizes.includes('XL')}
						onChange={() => filterDispatch({ type: 'SIZES_FILTER', payload: 'XL' })}
					/>
					<label htmlFor="XL">XL</label>
				</div>
				<span className={styles.filterTitle}>Ideal for</span>
				<div className={styles.filterContainer}>
					<input
						type="checkbox"
						id="men"
						checked={idealFor.includes('men')}
						onChange={() => genderFilterHandler('men')}
					/>
					<label htmlFor="men">Men</label>
				</div>
				<div className={styles.filterContainer}>
					<input
						type="checkbox"
						id="women"
						checked={idealFor.includes('women')}
						onChange={() => genderFilterHandler('women')}
					/>
					<label htmlFor="women">Women</label>
				</div>
				{brands.length > 0 ? (
					<>
						<span className={styles.filterTitle}>Brand</span>
						{brands.map((brand) => (
							<div className={styles.filterContainer} key={brand.id}>
								<input
									type="checkbox"
									id={brand.name}
									checked={itemBrand.includes(brand.name)}
									onChange={() => filterDispatch({ type: 'BRAND_FILTER', payload: brand.name })}
								/>
								<label htmlFor={brand.name}>{brand.name}</label>
							</div>
						))}
					</>
				) : null}
			</div>
		</aside>
	);
};

export { Filters };
