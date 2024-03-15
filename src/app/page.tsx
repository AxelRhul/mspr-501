"use client"

import { useEffect, useState } from "react";
import Header from "@/components/header";

interface Plant {
    id: string;
    name: string;
    userName: string;
    images: { id: string; url: string; }[];
}

export default function Home() {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        fetch('/api/plants')
            .then(response => response.json())
            .then(data => setPlants(data));
    }, []);

    console.log(plants);
    return (
        <>
            <Header />
            <div className="mx-6">
                <div className="flex flex-row items-center justify-end mb-4 space-x-16 md:space-x-32">
                    <h1 className="text-lg text-[#80CC28] font-bold flex items-center justify-center">Nouvelles Plantes</h1>
                    <a className="border-2 border-[#80CC28] py-0.5 px-1 rounded-lg" href={"/plantes/ajouter"}>Ajouter une plante</a>
                </div>
                <div className="grid grid-cols-3 gap-y-4 md:gap-y-6">
                    {plants.map((plant : Plant) => (
                        <div key={plant.id} className="flex flex-col items-center justify-center space-y-2">
                            <div className="flex flex-row items-center space-x-8 md:space-x-10">
                                <h2 className="text-sm underline underline-offset-2 decoration-[#80CC28]">{plant.name}</h2>
                                <p className="text-sm">{plant.userName}</p>
                            </div>
                            <div className="rounded-lg">
                                <a key={plant.id} href={`/plantes/${plant.id}`} className="">
                                    {plant.images.map((image) => (
                                        <img className="object-cover rounded-lg w-48 h-44 md:w-56 md:h-52" key={image.id} src={image.url} alt={plant.name} />
                                    ))}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
