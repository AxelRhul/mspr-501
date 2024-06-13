import CommentResponse from '@/interface/commentsInterface';
import React from 'react';

export function DisplayComments({ comments }: { comments: CommentResponse[] }) {
	return (
		<>
			{comments?.map((comment) => (
				<React.Fragment key={comment.id}>
					<p>{comment.content}</p>
					<p>{comment.plant.name}</p>
					<p>{comment.user.name}</p>
				</React.Fragment>
			))}
		</>
	);
}
