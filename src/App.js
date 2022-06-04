import React from 'react';
import styles from './App.module.css';
import { ProductListing, Filters } from 'components';

const App = () => {
	return (
		<main className={styles.main}>
			<Filters />
			<ProductListing />
		</main>
	);
};

export default App;
