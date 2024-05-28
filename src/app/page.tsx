"use client"
import {SessionProvider} from "next-auth/react";
import { useEffect, useState } from "react";
import LoginBtn from "@/components/login-btn";

export default function Home() {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        fetch('/api/plants')
            .then(response => response.json())
            .then(data => setPlants(data));
    }, []);

    return (
        <>
            <LoginBtn />
            <div>
                {plants.map((plant) => (
                    <a key={plant.id} href={`/plantes/${plant.id}`}>
                        <h2>{plant.name}</h2>
                        <p>Plante de {plant.user.name}</p>
                        {plant.images.map((image) => (
                            <img key={image.id} src={image.url} alt={plant.name} />
                        ))}
                    </a>
                ))}
                <a href={"/plantes/ajouter"}>Ajouter une plante</a>
            </div>
        </>
    );
}