import { User } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function LoginBtn() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (session?.user?.email) {
            fetch('/api/user/' + session.user.email)
                .then(response => response.json())
                .then(data => setUser(data));
        }
    }, [session]);
    console.log(session)
    if (session) {

    

        return (
            <>
                <Link href="/profil"  className="items-center text-xs flex flex-col">
                    <img src={user && user.image} alt="icon de profil connecté" title="Profil" className="w-10 rounded-full" />
                    
                </Link>
            </>
        )
    }
    return (
        <>
            <button onClick={() => signIn()} className="items-center text-xs flex flex-col">
                <img src="/img/profil.svg" alt="icon pour se connecter à son profil" title="Se connecter" />
            </button>
        </>
    )
}