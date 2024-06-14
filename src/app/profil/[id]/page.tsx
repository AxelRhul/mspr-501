"use client"
import { DisplayPlant } from "@/components/displayPlant";
import CommentForm from "@/components/commentForm";
import Comment from "@/interface/commentInterface";
import Plant from "@/interface/plantInterface";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";
import { useSession } from "next-auth/react";
import User from "@/interface/userInterface";
import PhotoTaker from "@/components/photoTaker";
import ModalHistorique from "@/components/modalHistorique";
import ModalGardien from "@/components/modalGardien";

export default function ShowPlants({ params }: { params: { id: string } }) {
    const [plant, setPlant] = useState<Plant>();
    const [isModalOpenHistorique, setIsModalOpenHistorique] = useState(false);
    const [isModalOpenGardien, setIsModalOpenGardien] = useState(false);

    useEffect(() => {
        fetch(`${BASE_URL}/api/plants/${params.id}`)
            .then(response => response.json())
            .then(data => setPlant(data));
    }, []);

    const { data: session, status } = useSession();

    const [user, setUser] = useState<User>();
    let userId = '';

    useEffect(() => {
        console.log("test")
        fetch('/api/user/' + session?.user?.email)
            .then(response => response.json())
            .then(data => setUser(data));

    }, [session]); // Depend on 'session' so it runs whenever 'session' changes

    if (user) {
        userId = user.id;
    }

    return (
        <>
            <div className="bg-[#80CC28] h-full flex flex-col pt-16">
                <div className="bg-white w-full h-auto flex flex-col items-center mt-48 lg:mt-52 2xl:mt-56 rounded-t-3xl pb-4">
                    <div className="flex flex-col items-center space-y-4 md:space-y-6 w-full px-10">
                            <img className="object-cover rounded-3xl -mt-40 w-80 h-80 lg:w-[352px] lg:h-[352px] xl:w-96 xl:h-96" src={user && user.image} alt={user && user.name} />
                        <div className=" w-80 lg:w-[352px] text-center xl:w-96">
                            <p className="flex items-center justify-center text-[#80CC28] text-base lg:text-lg">user.role</p>
                            <h2 className="w-80 lg:w-[352px] xl:w-96 flex items-center justify-center text-[#212729] text-3xl lg:text-4xl font-bold">{user && user.name}</h2>
                        </div>
                        
                        <div className="">
                            <h3>Mes plantes</h3>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
