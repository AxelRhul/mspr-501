import React from "react";
import {DisplayPlant} from "@/components/displayPlant";
import CommentForm from "@/components/commentForm";
import Comment from "@/interface/commentInterface";

export default async function ShowPlants({params}: { params: { id: string } },) {
    const plant = await fetch(`${process.env.BASE_URL}/api/plants/${params.id}`)
        .then(response => response.json())

    const comments = await fetch(`${process.env.BASE_URL}/api/comments/${params.id}`)
        .then(response => response.json())

    return (
        <>
            <DisplayPlant plant={plant}/>
            <h3>Commentaires</h3>
            {comments.map((comment: Comment) => {
                const date = new Date(comment.createdAt);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                const year = date.getFullYear();
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');

                const formattedDate = `${day}/${month}/${year} à ${hours}:${minutes}`;

                return(
                    <>
                        <p>Posté par {comment.user.name}, le {formattedDate}</p>
                        <p key={comment.id}>{comment.content}</p>

                    </>
                )
            }
            )}
            <CommentForm plantId={plant.id}/>
        </>
    )
}