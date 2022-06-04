import React, { createContext, useContext, useReducer } from 'react';
import { filterReducer } from 'reducer/filter-reducer';

const FilterContext = createContext({ filterState: {}, filterDispatch: () => {} });

export const FilterProvider = ({ children }) => {
	const [filterState, filterDispatch] = useReducer(filterReducer, {
		sizes: [],
		idealFor: [],
		brand: [],
	});

	return (
		<FilterContext.Provider value={{ filterState, filterDispatch }}>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilter = () => useContext(FilterContext);
