import Link from "next/link"

export default function Page() {
    return (
        <div className="h-screen w-full bg-messagerie bg-cover">
            <div className="bg-white w-full flex justify-between px-2">
                <Link href='/'>
                    <img src="/img/back.svg" alt="flèche retour" />
                </Link>
                <Link href="/profil">
                    <p>Name </p>
                </Link>
                
            </div>
            <div className="text-white space-y-2 px-2">
                <div className="py-2 px-5 bg-vert w-fit rounded-full">
                    <p>Message propriétaire </p>
                </div>
                <div className="py-2 px-5 bg-vertFoncé w-fit rounded-full">
                    <p>Message Gardien</p>
                </div>
            </div>
        </div>
    )
}