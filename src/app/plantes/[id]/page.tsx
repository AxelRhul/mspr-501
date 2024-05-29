"use client"
import {DisplayPlant} from "@/components/displayPlant";
import CommentForm from "@/components/commentForm";
import Comment from "@/interface/commentInterface";
import Plant from "@/interface/plantInterface";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";
import {useSession} from "next-auth/react";
import User from "@/interface/userInterface";
import PhotoTaker from "@/components/photoTaker";

export default function ShowPlants({params}: { params: { id: string } },) { 
    const [plant, setPlant] = useState<Plant>();

    useEffect(() => {
        fetch(`${BASE_URL}/api/plants/${params.id}`)
            .then(response => response.json())
            .then(data => setPlant(data));
    }, []);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`${BASE_URL}/api/comments/${params.id}`)
            .then(response => response.json())
            .then(data => setComments(data));
    }, []);  

    const { data: session, status } = useSession();

    const [user, setUser] = useState<User>();
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

    return (
        <>
            {plant && <DisplayPlant plant={plant}/>}
            {userId === plant?.userId && (
                <>
                <PhotoTaker plantId={plant?.id} />
                </>
            )}
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
            {plant && <CommentForm plantId={plant.id}/>}
        </>
    )
}