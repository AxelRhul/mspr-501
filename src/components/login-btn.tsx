import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
    const { data: session } = useSession()
    console.log(session)
    if (session) {
        return (
            <>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}