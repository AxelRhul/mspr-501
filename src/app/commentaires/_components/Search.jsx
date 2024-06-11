'use client';

import { DataListContext } from '@/contexts/DataListContext';
import { useContext } from 'react';

export default function Search() {
	const { setSearchValue } = useContext(DataListContext);

	const handleSearch = (event) => {
		const value = event.currentTarget.value;
		setSearchValue(value);
	};

	return (
		<input
			type='search'
			name='search'
			id='search-input'
			onChange={handleSearch}
		/>
	);
}
