"use client"

// import {auth} from '@/auth';
import Link from 'next/link';
// import {logoutAction} from '@/src/actions/logoutAction';

function Header() {
    // const session = await auth();
    // const user = session?.user;

    return (
        <header className='bg-[#FCFCFC] h-16 w-auto flex items-center border-b-2 border-[#80CC28] lg:rounded-b-3xl mb-4 lg:mb-6 xl:mb-8 2xl:mb-10'>
            <nav className='flex flex-row w-full justify-start h-full lg:justify-center'>
                <ul className='flex flex-row items-center p-6 space-x-48 sm:space-x-56 md:space-x-72 lg:justify-between lg:w-full lg:space-x-0'>
                    <>
                        <li className='lg:hidden'>
                            <Link href='/login'>
                                <img src="/img/profil.svg" alt="Profil"/>
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <img src="/img/logo_map.png" width={44} height={4} alt="Logo A'rosa-je"/>
                            </Link>
                        </li>
                        <li>
                            <Link href='/login' className='hidden lg:flex'>
                                <button
                                    className='border-2 border-[#80CC28] px-2 py-1 rounded-lg text-[#80CC28]'>Connexion
                                </button>
                            </Link>
                        </li>
                    </>
                </ul>
            </nav>
        </header>
    )
    {/*    {user && (*/
    }
    {/*        <>*/
    }
    {/*            <nav className='flex flex-row justify-center items-center mx-auto p-6 lg:justify-between lg:w-full'>*/
    }
    {/*                <Link href='/' className='text-black text-2xl font-semibold h-full'>*/
    }
    {/*                    <img src="/img/logo.png" width={84} height={44} alt="Logo A'rosa-je" />*/
    }
    {/*                </Link>*/
    }
    {/*                <ul className='hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:w-1/3'>*/
    }
    {/*                    <li>*/
    }
    {/*                        <Link href='/' className='text-black font-bold h-8 w-8'>*/
    }
    {/*                            <span>Accueil</span>*/
    }
    {/*                        </Link>*/
    }
    {/*                    </li>*/
    }
    {/*                    <li>*/
    }
    {/*                        <Link href='/map' className='text-black font-bold h-8 w-8'>*/
    }
    {/*                            <span>Carte</span>*/
    }
    {/*                        </Link>*/
    }
    {/*                    </li>*/
    }
    {/*                    <li>*/
    }
    {/*                        <Link href='/' className='text-black font-bold h-8 w-8'>*/
    }
    {/*                            <span>Messagerie</span>*/
    }
    {/*                        </Link>*/
    }
    {/*                    </li>*/
    }
    {/*                    <li>*/
    }
    {/*                        <Link href='/'>*/
    }
    {/*                            <img src="/img/profil.svg" alt="Profil" />*/
    }
    {/*                        </Link>*/
    }
    {/*                    </li>*/
    }
    {/*                </ul>*/
    }
    {/*            </nav>*/
    }
    {/*            <div className='absolute inset-x-0 bottom-0 lg:hidden'>*/
    }
    {/*                <div className='w-full h-16 p-6 sm:p-8 bg-[#80CC28] rounded-t-[32px]'>*/
    }
    {/*                    <ul className='h-full flex flex-row items-center justify-between'>*/
    }
    {/*                        <>*/
    }
    {/*                            <li>*/
    }
    {/*                                <Link href='' className='text-black h-8 w-8'>*/
    }
    {/*                                    <img src="/img/home.svg" alt="Accueil" />*/
    }
    {/*                                </Link>*/
    }
    {/*                            </li>*/
    }
    {/*                            <li>*/
    }
    {/*                                <Link href='/map' className='text-black h-8 w-8'>*/
    }
    {/*                                    <img src="/img/map.svg" alt="Carte" />*/
    }
    {/*                                </Link>*/
    }
    {/*                            </li>*/
    }
    {/*                            <li>*/
    }
    {/*                                <div className='bg-[#FCFCFC] rounded-full p-4'>*/
    }
    {/*                                    <Link href='/plantes/ajouter' className='text-black h-8 w-8'>*/
    }
    {/*                                        <img src="/img/camera.svg" alt="Appareil Photo" />*/
    }
    {/*                                    </Link>*/
    }
    {/*                                </div>*/
    }
    {/*                            </li>*/
    }
    {/*                            <li>*/
    }
    {/*                                <Link href='' className='text-black h-8 w-8'>*/
    }
    {/*                                    <img src="/img/messagerie.svg" alt="Messagerie" />*/
    }
    {/*                                </Link>*/
    }
    {/*                            </li>*/
    }
    {/*                            <li>*/
    }
    {/*                                <Link href='' className='text-black h-8 w-8'>*/
    }
    {/*                                    <img src="/img/profil-logged.svg" alt="Profil" />*/
    }
    {/*                                </Link>*/
    }
    {/*                                <form action={logoutAction} className='flex'>*/
    }
    {/*                                    <li className='ml-4'>*/
    }
    {/*                                        <button>Logout</button>*/
    }
    {/*                                    </li>*/
    }
    {/*                                </form>*/
    }
    {/*                            </li>*/
    }
    {/*                        </>*/
    }
    {/*                    </ul>*/
    }
    {/*                </div>*/
    }
    {/*            </div>*/
    }
    {/*        </>*/
    }
    {/*    )}*/
    }
    {/*</header >*/
    }
};


export default Header;