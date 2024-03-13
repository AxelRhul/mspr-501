import React, {FormEvent, useEffect, useState} from "react";
import {DisplayPlant} from "@/app/components/DisplayPlant";
import CommentForm from "@/app/components/CommentForm";
import {SessionProvider} from "next-auth/react";
import Form from "@/app/components/form";

export default async function ShowPlants({params}: { params: { id: string } },) {
    const plant = await fetch(`${process.env.BASE_URL}/api/plants/${params.id}`)
        .then(response => response.json())

    const comments = await fetch(`${process.env.BASE_URL}/api/comments/${params.id}`)
        .then(response => response.json())

    console.log(comments)
    return (
        <>
            <DisplayPlant plant={plant}/>
            <h3>Commentaires</h3>
            {comments.map((comment) => (
                <>
                    <p>Posté par {comment.user.name}, le {comment.createdAt}</p>
                    <p key={comment.id}>{comment.content}</p>

                </>
            ))}
            <Form plantId={plant.id}/>
        </>
    )
}