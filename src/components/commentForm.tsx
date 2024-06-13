"use client";
import React, { useEffect, useState } from "react";
import {useSession} from "next-auth/react";
import User from "@/interface/userInterface";

export default function CommentForm({plantId} : {plantId: string}) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User>();
    let userId = "";

    useEffect(() => {
            fetch('/api/user/'+session?.user?.email)
                .then(response => response.json())
                .then(data => setUser(data));
        }, [session]);

    if (user) {
        userId = user.id
    }


    async function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        formData.append('plant-id', plantId);
        formData.append('user-id', userId);

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