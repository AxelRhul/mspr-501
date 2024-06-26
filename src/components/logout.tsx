import { useSession, signIn, signOut } from "next-auth/react"

export default function Logout() {
    const { data: session } = useSession()
    console.log(session)
    if (session) {
        return (
            <>
                <button onClick={() => signOut()} className="items-center text-md font-medium hover:text-rouge duration-300 flex flex-col">
                    Se déconnecter
                </button>
            </>
        )
    }
    return (
        <>
            <button onClick={() => signIn()} className="items-center text-md font-medium hover:text-vert duration-300 flex flex-col">
                Se connecter
            </button>
        </>
    )
}