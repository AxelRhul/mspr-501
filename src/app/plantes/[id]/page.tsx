"use client"

import {FormEvent, useEffect, useState} from "react";

export default function ShowPlants({ params }: { params: { id: string } }) {
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        fetch(`/api/plants/${params.id}`)
            .then(response => response.json())
            .then(data => setPlant(data))
            .catch(error => console.error('Error:', error));
    }, [params.id]);

    if (!plant) {
        return <div>Loading...</div>;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const fetchResponse = await fetch('/api/comments',
            {
                method: 'POST',
                body:  formData,
            })

        window.location.reload();
    }

    return (
        <>
            <h2>{plant.name}</h2>
            <p>Plante de {plant.userName}</p>
            {plant.images.map((image) => (
                <img key={image.id} src={image.url} alt={plant.name} />
            ))}
            <h3>Commentaires</h3>
            <ul>
                {plant.comments.map((comment) => (
                    <li key={comment.id}>
                        <p>Date: {comment.createdAt}</p>
                        <p>Par {comment.name}</p>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Votre nom" required={true}/>
                    <input type="text" name="comment" placeholder="Votre Commentaire" required={true}/>
                    <input type="hidden" name="plantId" value={plant.id} />
                    <button type="submit">Submit</button>
                </form>
        </>
    )
}