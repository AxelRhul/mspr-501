"use client";
import React, { useEffect, useState } from "react";
import {useSession} from "next-auth/react";
import User from "@/interface/userInterface";

export default function CommentForm({plantId} : {plantId: string}) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User>();
    if (status === "loading") {
        return <div>Loading...</div>; // or some other loading indicator
    }
    let userId = "";

    const fetchUser = async () => {
        if (session && session.user && session.user.email) {
            const response = await fetch('/api/user/'+session.user.email);
            const data = await response.json();
            setUser(data);
        }
    }

    fetchUser();

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