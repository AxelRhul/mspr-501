"use client"

import { useEffect, useState } from "react";

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
            <div className="mx-10 my-4">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-lg text-[#80CC28] font-bold flex items-center justify-center">Nouvelles Plantes</h1>
                    <a className="border-2 border-[#80CC28] py-1 px-2 rounded-lg" href={"/plantes/ajouter"}>Ajouter une plante</a>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                    {plants.map((plant) => (
                        <div className="flex flex-col">
                            <h4 className="text-sm text-center">{plant.name}</h4>
                            <a key={plant.id} href={`/plantes/${plant.id}`}>
                                <div className="flex flex-col items-center bg-[#F5F5F5] border-2 border-[#80CC28] p-2 rounded-lg shadow shadow-[#80CC28]">
                                    {plant.images.map((image) => (
                                        <img className="object-cover rounded-[7px] w-44 h-44 md:w-72 md:h-72 2xl:w-80 2xl:h-80" key={image.id} src={image.url} alt={plant.name} />
                                    ))}
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="w-full flex flex-row items-center">
                                            <p className="text-sm underline underline-offset-2 decoration-[#80CC28] mr-2">Auteur :</p>
                                            <p className="text-sm">{plant.userName}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
