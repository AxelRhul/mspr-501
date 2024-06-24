"use client"
import { useEffect, useState } from "react";
import Plant from "../interface/plantInterface";
import LoginBtn from "../components/login-btn";
import { User } from "@prisma/client";

export default function Home() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [users, setUsers]= useState<User[]>([]);

    useEffect(() => {
        fetch('/api/plants')
            .then(response => response.json())
            .then(data => setPlants(data));
    }, []);

    useEffect(()=> {
        fetch('/api/users')
        .then(response => response.json())
        .then(data => SVGAElement)
    }
    )

    return (
        <>
            {/* <div className="flex flex-row justify-evenly mb-4 pt-20">
                <LoginBtn />
                <a href={"/plantes/ajouter"}>Ajouter une plante</a>
                <a href={"/commentaires"}>Voir tout les commentaires</a>
            </div> */}
            <div className="pt-16">
                <div className="w-11/12 lg:w-9/12 mx-auto text-center lg:text-start mt-4">
                    <h1 className="text-3xl lg:text-5xl font-bold pb-2">Bienvenue sur A&apos;rosa-je !</h1>
                    <h3 className="text-[#5C8F37] lg:text-xl text-lg">Découvrez dès maintenant la première application <br /> de gardiennage de plantes !</h3>
                    <div className="flex flex-col-reverse justify-between xl:flex-row">
                        <div className="xl:w-1/2 text-center xl:text-start">
                            <div className="flex items-center font-bold text-lg justify-center xl:justify-start sm:text-2xl 2xl:text-3xl pt-10 pb-2">
                                <img src="/img/A.svg" alt="petit icon de plante" className="w-8 lg:w-12 mr-2" />
                                <h4>Qui sommes-<span className="text-[#5c8f37]">nous</span> ?</h4>
                            </div>
                            <p className="text-lg md:text-xl  xl:pr-16">
                                Nous sommes une communauté de
                                <span className="text-[#5c8f37]"> botanistes </span>
                                et d&apos;amateurs de plantes passionnés, unis par l&apos;envie de partager notre
                                <span className="text-[#5c8f37]"> amour </span>
                                des végétaux et notre <span className="text-[#5c8f37]">expertise</span>.
                                Notre objectif est de créer un
                                <span className="text-[#5c8f37]"> réseau solidaire </span>
                                où chaque plante peut recevoir les soins dont elle a besoin, même en l&apos;absence de son propriétaire.
                            </p>
                            <div className="flex items-center justify-center xl:justify-start font-bold text-lg sm:text-2xl 2xl:text-3xl pt-10 pb-2">
                                <img src="/img/A.svg" alt="petit icon de plante" className="w-8 lg:w-12 mr-2" />
                                <h4>Présentation de l&apos;application</h4>
                            </div>
                            <p className="text-lg md:text-xl xl:pr-16">
                                Notre aventure est ouverte à tous : que vous souhaitiez faire
                                <span className="text-[#5c8f37]"> garder vos plantes </span>,
                                offrir votre aide en tant que <span className="text-[#5c8f37]"> gardien de plantes </span>
                                , ou même rejoindre notre équipe de <span className="text-[#5c8f37]"> botanistes conseillers </span>
                                , vous êtes les <span className="text-[#5c8f37]"> bienvenus !</span></p>

                        </div>

                        <img src="/img/mockup.png" alt="illustration de A'rosa-je" className="sm:w-1/2 pt-8 mx-auto xl:mx-0" />
                    </div>
                </div>
            </div>
            <hr className="w-11/12 lg:w-9/12 mx-auto border border-[#80CC28] rounded-full my-20" />
            <div className="w-11/12 lg:w-9/12 mx-auto my-4 pb-4">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-lg text-[#80CC28] font-bold flex items-center justify-center">Nouvelles Plantes</h1>
                    <a className="border-2 border-[#80CC28] py-1 px-2 rounded-lg" href={"/plantes/ajouter"}>Ajouter une plante</a>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 justify-items-center w-full">
                    {plants.map((plant) => (
                        <div key={plant.id} className="flex flex-col">
                            <a href={`/plantes/${plant.id}`}>
                                <div className="flex flex-col items-center bg-[#F5F5F5] border-2 border-[#80CC28] rounded-lg shadow shadow-[#80CC28] w-full h-full space-x-4">
                                    {plant.images.map((image) => (
                                        <img className="object-cover rounded-[7px] w-full h-full" key={image.id} src={image.url} alt={plant.name} />
                                    ))}
                                </div>
                                <h4 className="text-sm text-center">{plant.name}</h4>
                                <p>Plante de {plant.user.name}</p>
                            </a>
                        </div>
                    ))}
                </div>

                {/* {plants.map((plant) => (


                    <a key={plant.id} href={`/plantes/${plant.id}`}>
                        <div className="flex flex-col items-center bg-[#F5F5F5] border-2 border-[#80CC28] p-2 rounded-lg shadow shadow-[#80CC28]">
                            <div className="flex flex-col items-center space-y-2">
                                <div className="w-full flex flex-row items-center">
                                    <p className="text-sm underline underline-offset-2 decoration-[#80CC28] mr-2">Auteur :</p>
                                    <p className="text-sm">{plant.userName}</p>
                                </div>
                            </div>
                        </div>
                    </a>

                ) */}
            </div >
        </>
    );
}