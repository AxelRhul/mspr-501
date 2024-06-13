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

export default function ShowPlants({ params }: { params: { id: string } },) {
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

    useEffect(() => {
        console.log("test")
        fetch('/api/user/' + session?.user?.email)
            .then(response => response.json())
            .then(data => setUser(data));

    }, [session]); // Depend on 'session' so it runs whenever 'session' changes

    if (user) {
        userId = user.id
    }

    return (
        <>
            <div className="bg-[#80CC28] h-full flex flex-col pt-16">
                <div className="bg-white w-full h-auto flex flex-col items-center mt-48 lg:mt-52 2xl:mt-56 rounded-t-3xl pb-4">
                    <div className="flex flex-col items-center space-y-4 md:space-y-6 w-full px-10">
                        {plant && plant.images.map((image) => (
                            <img className="object-cover rounded-3xl -mt-40 w-80 h-80 lg:w-[352px] lg:h-[352px] xl:w-96 xl:h-96" key={image.id} src={image.url} alt={plant.name} />
                        ))}
                        <div className="flex flex-row items-center justify-between w-80 lg:w-[352px] xl:w-96">
                            <p className="flex items-center justify-center text-[#676A65] text-lg lg:text-xl underline underline-offset-4 decoration-[#80CC28] ">Dernière photo prise le :</p>
                            <p className="flex items-center justify-center text-[#676A65] text-lg lg:text-xl">XX/XX/XX</p>
                        </div>
                        <a href="" className="flex items-center justify-center text-[#5C8F37] font-semibold text-base lg:text-lg">Voir l'historique de la plante</a>
                        {/* {userId === plant?.userId && (
                            <>
                                <PhotoTaker plantId={plant?.id} />
                            </>
                        )} */}
                        <h2 className="w-80 lg:w-[352px] xl:w-96 flex items-center justify-center text-[#212729] text-3xl lg:text-4xl font-bold">{plant && plant.name}</h2>
                        <div className="w-80 lg:w-[352px] xl:w-96 flex flex-row items-center justify-between">
                            <div className="w-14 md:w-16 flex flex-row items-center justify-between">
                                <img className="w-4 lg:w-5" src="/img/water.svg" alt="Water" />
                                <img className="w-4 lg:w-5" src="/img/water.svg" alt="Water" />
                                <img className="w-4 lg:w-5" src="/img/water.svg" alt="Water" />
                            </div>
                            <div className="w-14 md:w-16 flex flex-row items-center justify-between">
                                <img className="w-6 lg:w-10" src="/img/sun.svg" alt="Sun" />
                                <img className="w-6 lg:w-10" src="/img/sun.svg" alt="Sun" />
                                <img className="w-6 lg:w-10" src="/img/sun.svg" alt="Sun" />
                            </div>
                        </div>
                        <div className="w-10/12 space-y-4">
                            <h4 className="flex justify-start text-xl md:text-2xl text-[#80CC28] font-semibold">Botaniste</h4>
                            <hr className="w-full border border-[#80CC28] rounded-full" />
                            <div className="flex flex-row items-center space-x-4">
                                <img className="w-16" src="/img/profil.svg" alt="" />
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-[#212729] text-xl font-semibold underline underline-offset-4 decoration-[#80CC28]">Richard</p>
                                    <p className="text-[#212729] text-xl font-semibold underline underline-offset-4 decoration-[#80CC28]">Mielot</p>
                                </div>
                            </div>
                            <hr className="w-full border border-[#80CC28] rounded-full" />
                        </div>
                        <div className="w-10/12 space-y-2 md:space-y-4">
                            <h3 className="flex justify-start text-xl md:text-2xl text-[#80CC28] font-semibold">Commentaires</h3>
                            <ul className="space-y-2 md:space-y-4">
                                {comments.map((comment: Comment) => {
                                    const date = new Date(comment.createdAt);
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                                    const year = date.getFullYear();
                                    const hours = String(date.getHours()).padStart(2, '0');
                                    const minutes = String(date.getMinutes()).padStart(2, '0');

                                    const formattedDate = `${day}/${month}/${year} à ${hours}:${minutes}`;

                                    return (
                                        <>
                                            <li className="flex flex-col items-start space-y-2 border border-[#80CC28] rounded-lg py-1 px-2" key={comment.id}>
                                                <div className="flex flex-row items-center space-x-2">
                                                    <p className="text-base">{comment.user.name}</p>
                                                    <p className="text-base">{formattedDate}</p>
                                                </div>
                                                <p className="text-lg" key={comment.id}>{comment.content}</p>
                                            </li>
                                        </>
                                    )
                                }
                                )}
                            </ul>
                        </div>
                        <div className="w-10/12 space-y-2 md:space-y-4">
                            <h3 className="flex justify-start text-xl md:text-2xl text-[#80CC28] font-semibold">Ajouter un commentaire</h3>
                            <CommentForm plantId={String(plant?.id)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}