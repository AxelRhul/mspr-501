'use client';

import { useFetch } from '@/app/hooks/useFetch';
import { BASE_URL } from '@/constants';
import { DataListContext } from '@/contexts/DataListContext';
import CommentResponse from '@/interface/commentsInterface';
import React, { useContext, useEffect } from 'react';
import { DisplayComments } from './DisplayComments';

export function FetchComments() {
	const { searchValue } = useContext(DataListContext);

	const { data: comments, loading, fetchData } = useFetch<CommentResponse[]>();

	useEffect(() => {
		fetchData(`${BASE_URL}/api/comments`);
	}, [fetchData]);

	const result = comments?.filter((comment) =>
		comment.content.includes(searchValue)
	);

	return (
		<>
			{loading && <p>Chargement en cours...</p>}

			{searchValue !== '' && !loading && result?.length == 0 && (
				<p>Aucun commentaire pour {searchValue}</p>
			)}

			{result && result?.length !== 0 && <DisplayComments comments={result} />}

			{result?.length == 0 && !loading && searchValue == '' && (
				<p>Aucun commentaires</p>
			)}
		</>
	);
}
