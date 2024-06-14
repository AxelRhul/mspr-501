"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import User from "@/interface/userInterface";

export default function CommentForm({ plantId }: { plantId: string }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User>();
    let userId = "";

    useEffect(() => {
        fetch('/api/user/' + session?.user?.email)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [session]);

    if (user) {
        userId = user.id
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start justify-center space-y-2 md:space-y-4 mb-4">
                <textarea className="border-2 border-[#80CC28] w-full rounded-lg p-2" id="content" name="content" required />
                <button className="bg-[#80CC28] p-2 w-full rounded-xl text-[#FCFCFC] text-base md:text-lg font-semibold" type="submit">Envoyer</button>
            </div>
        </form >
    )
}