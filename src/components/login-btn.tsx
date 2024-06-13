import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
    const { data: session } = useSession()
    console.log(session)
    if (session) {
        return (
            <>
                <button onClick={() => signOut()} className="items-center text-xs flex flex-col">
                    <img src="/img/profil-log.svg" alt="icon de profil connecté" title="Se déconnecter" />
                    Se déconnecter
                </button>
            </>
        )
    }
    return (
        <>
            <button onClick={() => signIn()} className="items-center text-xs flex flex-col">
                <img src="/img/profil.svg" alt="icon pour se connecter à son profil" title="Se connecter" />
                Se connecter <br />
            </button>
        </>
    )
}