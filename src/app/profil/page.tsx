"use client";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";
import { useSession } from "next-auth/react";
import User from "@/interface/userInterface";
import Plant from "@/interface/plantInterface"; // Assurez-vous de définir cette interface
import Logout from "@/components/logout";
import Link from "next/link";
export default function Profil() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User>();
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        if (session?.user?.email) {
            fetch('/api/user/' + session.user.email)
                .then(response => response.json())
                .then(data => setUser(data));
        }
    }, [session]);

    useEffect(() => {
        if (user?.id) {
            fetch(`${BASE_URL}/api/plants?userId=${user.id}`)
                .then(response => response.json())
                .then(data => setPlants(data));
        }
    }, [user]);

    return (
        <>
            <div className="bg-[#80CC28] h-full flex flex-col pt-16">
                <div className="bg-white w-full h-full flex flex-col items-center mt-48 lg:mt-52 2xl:mt-56 rounded-t-3xl pb-4">
                    <div className="flex flex-col items-center space-y-4 md:space-y-6 w-full px-10">
                        <img className="object-cover rounded-3xl -mt-40 w-80 h-80 lg:w-[352px] lg:h-[352px] xl:w-96 xl:h-96" src={user && user.image} alt={user && user.name} />
                        <Logout></Logout>
                        <div className="w-80 lg:w-[352px] text-center xl:w-96">
                            <p className="flex items-center justify-center text-[#80CC28] lg:text-xl text-lg">{user?.role}</p>
                            <h2 className="w-80 lg:w-[352px] xl:w-96 flex items-center justify-center text-[#212729] text-2xl lg:text-4xl font-bold">{user && user.name}</h2>
                            <p>{user?.id}</p>
                        </div>
                        
                        <div className="text-center">
                            <Link className="text-[#80CC28] duration-300 font-semibold hover:text-[#5C8F37]" href='plantes/ajouter'>
                                Ajouter une plante
                                </Link>
                            <h3 className="text-xl lg:text-2xl font-semibold pb-6">Mon jardin :</h3>
                                {plants.length > 0 ? (
                                    <ul className="grid grid-cols-2 lg:grid-cols-4 w-10/12 mx-auto">
                                    {plants.map((plant) => (
                                        <div key={plant.id} className="flex flex-col">
                                            <a href={`/plantes/${plant.id}`}>
                                                <div className="flex flex-col items-center bg-[#F5F5F5] border-2 border-[#80CC28] rounded-3xl shadow shadow-[#80CC28] w-full h-full space-x-4">
                                                    {plant.images.map((image) => (
                                                        <img className="object-cover rounded-3xl w-full h-full" key={image.id} src={image.url} alt={plant.name} />
                                                    ))}
                                                </div>
                                                <h4 className="text-md mt-1 capitalize font-medium text-center">{plant.name}</h4>
                                            </a>
                                        </div>
                                    ))}
                                    </ul>
                                ) : (
                                    <>
                                        <p>Vous ne possèdez pas encore de plantes</p>
                                        <Link  className="text-[#80CC28] duration-300 font-semibold hover:text-[#5C8F37]" href='plantes/ajouter'>
                                        Ajouter ma première plante
                                        </Link>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
