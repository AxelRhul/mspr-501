import { Suspense } from 'react';
import { FetchComments } from './_components/FetchComments';
import Loading from './loading';
import { DataListProvider } from '@/contexts/DataListContext';
import DataList from '@/app/commentaires/_components/DataList';

export default function CommentsPage() {
	return (
		<>
			<h1>Commentaires</h1>

			<Suspense fallback={<Loading />}>
				<DataListProvider>
					<DataList.Search />

					<FetchComments />
				</DataListProvider>
			</Suspense>
		</>
	);
}
