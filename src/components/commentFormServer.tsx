import React, { useEffect, useState } from "react";
import {useSession} from "next-auth/react";

export default function CommentFormServer({plantId}) {
    const { data: session, status } = useSession()
    let userEmail;

    if (status === "loading") {
        return <div>Loading...</div>; // or some other loading indicator
    }

    if (session) {
        userEmail = session.user.email;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        formData.append('plant-id', plantId);
        formData.append('user-email', userEmail);

        const fetchResponse = await fetch('/api/comments',
            {
                method: 'POST',
                body: formData,
            })

        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="content">Commentaire</label>
            <textarea id="content" name="content" required/>
            <button type="submit">Envoyer</button>
        </form>
    )
}