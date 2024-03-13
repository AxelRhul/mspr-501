"use client"

import {useEffect, useState} from "react";

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

    return (
        <>
            <h2>{plant.name}</h2>
            <p>Plante de {plant.userName}</p>
            {plant.images.map((image) => (
                <img key={image.id} src={image.url} alt={plant.name} />
            ))}
        </>
    )
}