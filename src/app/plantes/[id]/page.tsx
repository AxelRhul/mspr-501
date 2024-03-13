"use client"

import React, {FormEvent, useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import {getCommentsByUserId} from "@/src/providers/getCommentsByUserId";

export default function ShowPlants({params}: { params: { id: string } }) {
    const [plant, setPlant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState(""); // Add this line

    useEffect(() => {
        fetch(`/api/plants/${params.id}`)
            .then(response => response.json())
            .then(data => setPlant(data))
            .catch(error => console.error('Error:', error));
    }, [params.id]);

    useEffect(() => {
        isSession();
    }, []);

    if (!plant) {
        return <div>Loading...</div>;
    }

    async function isSession() {
        const session = await getSession();
        if (!session) {
            window.location.href = "/api/auth/signin";
        }
        setIsLoading(false);
        sessionStorage.setItem('user-email', session.user.email);
        console.log(getCommentsByUserId(session.user.id))
    }

    // Rest of your component

    if (isLoading) {
        return <div>Loading...</div>;
    }



    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        formData.append('user-email', sessionStorage.getItem('user-email'));

        const fetchResponse = await fetch('/api/comments',
            {
                method: 'POST',
                body: formData,
            })

        window.location.reload();
    }

    return (
        <>
            <h2>{plant.name}</h2>
            <p>Plante de {plant.user.name}</p>
            {plant.images.map((image) => (
                <img key={image.id} src={image.url} alt={plant.name}/>
            ))}
            <h3>Commentaires</h3>
            {/*<ul>*/}
            {/*    {comments.map((comment) => (*/}
            {/*        <li key={comment.id}>*/}
            {/*            <p>Date: {comment.createdAt}</p>*/}
            {/*            <p>Par {comment.user.name}</p>*/}
            {/*            <p>{comment.content}</p>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <form onSubmit={handleSubmit}>
                <input type="text" name="comment" placeholder="Votre Commentaire" required={true}/>
                <input type="hidden" name="plantId" value={plant.id}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}