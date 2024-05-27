import FormCommentaire from "@/components/formCommentaire";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "../error";

export default async function ShowPlants({ params }: { params: { id: string } }) {

    const response = await fetch(`${process.env.DOMAINE_URL}/api/plants/${params.id}`, {
        method: "GET",
    });


    if (!response.ok) {
        return "une erreur est survenue"
    }

    const plant = await response.json();

    return (
        <>
            {/* <div className="bg-[#80CC28] w-full h-screen relative">
                {plant.images.map((image) => (
                    <img className="absolute w-72 translate-y-1/2 rounded-2xl z-10" key={image.id} src={image.url} alt={plant.name} />
                ))}
                <div className="bg-[#FCFCFC] h-full relative top-56 rounded-t-3xl space-y-4">
                    <div className="absolute top-40 left-0 w-full space-y-2">
                        <div className="flex flex-row items-center justify-center space-x-4">
                            <p className="flex items-center justify-center text-[#676A65] underline underline-offset-4 decoration-[#80CC28] ">Dernière photo prise le :</p>
                            <p className="flex items-center justify-center text-[#676A65]">XX/XX/XX</p>
                        </div>
                        <a href="" className="flex items-center justify-center text-[#5C8F37] font-semibold text-lg">Voir l'historique</a>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <h2 className="flex items-center justify-center text-[#212729] text-5xl font-bold">{plant.name}</h2>
                            <div className="flex flex-row items-center space-x-44">
                                <div className="flex flex-row items-center justify-center space-x-1">
                                    <img className="w-4" src="/img/water.svg" alt="Water" />
                                    <img className="w-4" src="/img/water.svg" alt="Water" />
                                    <img className="w-4" src="/img/water.svg" alt="Water" />
                                </div>
                                <div className="flex flex-row items-center justify-center space-x-1">
                                    <img className="w-6" src="/img/sun.svg" alt="Sun" />
                                    <img className="w-6" src="/img/sun.svg" alt="Sun" />
                                    <img className="w-6" src="/img/sun.svg" alt="Sun" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-32 top-80 w-96">
                        <h4 className="flex justify-start text-xl text-[#80CC28] font-semibold">Botaniste</h4>
                        <div className="flex flex-col items-center space-y-4">
                            <hr className="w-full border-2 border-[#80CC28] rounded-full" />
                            <div className="flex flex-row items-center space-x-2">
                                <img className="w-16" src="/img/profil.svg" alt="" />
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-[#212729] text-xl font-semibold underline underline-offset-4 decoration-[#80CC28]">{plant.userName}</p>
                                    <p className="text-[#212729] text-xl font-semibold underline underline-offset-4 decoration-[#80CC28]">Mielot</p>
                                </div>
                            </div>
                            <hr className="w-full border-2 border-[#80CC28] rounded-full" />
                        </div>
                    </div>
                    
                    <div className="absolute left-32 top-[470px]">
                        <h3 className="flex justify-start text-xl text-[#80CC28] font-semibold">Commentaires</h3>
                        <ul>
                            {plant.comments.map((comment) => {
                                const date = new Date(comment.createdAt);
                                const day = String(date.getDate()).padStart(2, '0');
                                const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                                const year = date.getFullYear();
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');

                                const formattedDate = `${day}/${month}/${year} à ${hours}:${minutes}`;

                                return (
                                    <li className="flex flex-col items-start space-y-2" key={comment.id}>
                                        <div className="flex flex-row items-center space-x-2">
                                            <p className="text-lg">{comment.name}</p>
                                            <p className="text-lg">{formattedDate}</p>
                                        </div>
                                        <p className="text-lg">{comment.content}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <hr className="absolute left-32 top-[580px] border border-[#80CC28] w-96" />
                    <ErrorBoundary errorComponent={Error}>
                        <FormCommentaire id={plant.id} />
                    </ErrorBoundary>
                </div>
            </div> */}
            <div className="bg-[#80CC28] h-full flex flex-col">
                <div className="bg-white w-full h-full flex flex-col items-center mt-48 lg:mt-52 2xl:mt-56 rounded-t-3xl pb-4">
                    <div className="flex flex-col items-center space-y-4 md:space-y-6 w-full px-10">
                        {plant.images.map((image) => (
                            <img className="object-cover rounded-3xl -mt-40 w-80 h-80 lg:w-[352px] lg:h-[352px] xl:w-96 xl:h-96" key={image.id} src={image.url} alt={plant.name} />
                        ))}
                        <div className="flex flex-row items-center justify-between w-80 lg:w-[352px] xl:w-96">
                            <p className="flex items-center justify-center text-[#676A65] text-lg lg:text-xl underline underline-offset-4 decoration-[#80CC28] ">Dernière photo prise le :</p>
                            <p className="flex items-center justify-center text-[#676A65] text-lg lg:text-xl">XX/XX/XX</p>
                        </div>
                        <a href="" className="flex items-center justify-center text-[#5C8F37] font-semibold text-base lg:text-lg">Voir l'historique de la plante</a>
                        <h2 className="w-80 lg:w-[352px] xl:w-96 flex items-center justify-center text-[#212729] text-3xl lg:text-4xl font-bold">{plant.name}</h2>
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
                                    <p className="text-[#212729] text-xl font-semibold underline underline-offset-4 decoration-[#80CC28]">{plant.userName}</p>
                                    <p className="text-[#212729] text-xl font-semibold underline underline-offset-4 decoration-[#80CC28]">Mielot</p>
                                </div>
                            </div>
                            <hr className="w-full border border-[#80CC28] rounded-full" />
                        </div>
                        <div className="w-10/12 space-y-2 md:space-y-4">
                            <h3 className="flex justify-start text-xl md:text-2xl text-[#80CC28] font-semibold">Commentaires</h3>
                            <ul className="space-y-2 md:space-y-4">
                                {plant.comments.map((comment) => {
                                    const date = new Date(comment.createdAt);
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                                    const year = date.getFullYear();
                                    const hours = String(date.getHours()).padStart(2, '0');
                                    const minutes = String(date.getMinutes()).padStart(2, '0');

                                    const formattedDate = `${day}/${month}/${year} à ${hours}:${minutes}`;

                                    return (
                                        <div className="space-y-1">
                                            <li className="flex flex-col items-start space-y-2 border border-[#80CC28] rounded-lg py-1 px-2" key={comment.id}>
                                                <div className="flex flex-row items-center space-x-2">
                                                    <p className="text-base">{comment.name}</p>
                                                    <p className="text-base">{formattedDate}</p>
                                                </div>
                                                <p className="text-lg">{comment.content}</p>
                                            </li>
                                            {/* <p className="text-right">Répondre</p> */}
                                            {/* <hr className="w-full border border-gray-400 rounded-lg" /> */}
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* <hr className="w-full border border-[#80CC28] rounded-full" /> */}
                        <div className="w-10/12 space-y-2 md:space-y-4">
                            <ErrorBoundary errorComponent={Error}>
                                <h3 className="flex justify-start text-xl md:text-2xl text-[#80CC28] font-semibold">Ajouter un commentaire</h3>
                                <FormCommentaire id={plant.id} />
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}