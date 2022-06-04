const checkboxFilter = (arr, arrItem) => {
	if (arr.includes(arrItem)) {
		const genderToRemove = arr.find((item) => item === arrItem);
		const idealFor = arr.filter((item) => item !== genderToRemove);
		return idealFor;
	} else {
		return [...arr, arrItem];
	}
};

export const filterReducer = (state, { type, payload }) => {
	switch (type) {
		case 'GENDER_FILTER':
			return { ...state, idealFor: checkboxFilter(state.idealFor, payload) };

		case 'BRAND_FILTER':
			return { ...state, brand: checkboxFilter(state.brand, payload) };

		case 'SIZES_FILTER':
			return { ...state, sizes: checkboxFilter(state.sizes, payload) };

		case 'CLEAR':
			return { ...state, sizes: [], idealFor: [], brand: [] };

		default:
			throw new Error('NO CASE DEFINED IN FILTER REDUCER');
	}
};
