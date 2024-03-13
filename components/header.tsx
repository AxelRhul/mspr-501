import { auth, signOut } from '@/auth';
import Link from 'next/link';

const Header = async () => {
    const session = await auth();
    const user = session?.user;

    const logoutAction = async () => {
        'use server';
        await signOut();
    };

    return (
        <header className='bg-red h-20'>
            <nav className='h-full flex justify-between container items-center'>
                <div>
                    <Link href='/' className='text-black text-2xl font-semibold'>
                        Arosaje
                    </Link>
                </div>
                <ul className='flex items-center space-x-4'>
                    <li>
                        <Link href='/' className='text-black'>
                            Home
                        </Link>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <Link href='/register' className='text-black'>
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link href='/login' className='text-black'>
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <form action={logoutAction} className='flex'>
                            <li className='ml-4'>
                                <button>Logout</button>
                            </li>
                        </form>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
