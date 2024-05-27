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
            <div className="bg-[#80CC28] w-full h-screen relative">
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
            </div>
        </>
    )
}