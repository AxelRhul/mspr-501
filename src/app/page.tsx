"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        fetch('/api/plants')
            .then(response => response.json())
            .then(data => setPlants(data));
    }, []);

    return (
        <div>
            {plants.map((plant) => (
                <div key={plant.id}>
                    <h2>{plant.name}</h2>
                    <p>Plante de {plant.userName}</p>
                    {plant.images.map((image) => (
                        <img key={image.id} src={image.url} alt={plant.name} />
                    ))}
                </div>
            ))}
            <a href={"/plantes/ajouter"}>Ajouter une plante</a>
        </div>
    );
}
