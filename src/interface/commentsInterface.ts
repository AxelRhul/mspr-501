import { Comment, Plant, User } from '@prisma/client';

export default interface CommentResponse {
	id: Comment['id'];
	content: Comment['content'];
	createdAt: Comment['createdAt'];
	user: {
		name: User['name'];
	};
	plant: {
		name: Plant['name'];
	};
}
