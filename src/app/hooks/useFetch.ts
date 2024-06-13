import { useCallback, useState } from 'react';

export const useFetch = <T>() => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchData = useCallback((url: string | URL) => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				setData(data);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, loading, fetchData };
};
