"use client"

// import {auth} from '@/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import {logoutAction} from '@/src/actions/logoutAction';

function Header() {
    // const session = await auth();
    // const user = session?.user;
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollTop = 0;

        function handleScroll() {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScrollTop) {
                if (isVisible && currentScroll > 100) {
                    setIsVisible(false);
                };
            } else {
                if (!isVisible && currentScroll + window.innerHeight < document.documentElement.scrollHeight - 50) {
                    setIsVisible(true);
                }
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isVisible])

    return (
        <>
            <div className=' sticky top-0'>
                <header className='h-12 md:h-14 bg-[#ffffff] rounded-b-3xl flex justify-center lg:hidden lg:order-2'>
                    <ul className='flex flex-row items-center w-full justify-between mx-10'>
                        <li>
                            <Link href='/login'>
                                <img src="/img/profil.svg" alt="Profil" />
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <img src="/img/logo_map.png" width={44} height={4} alt="Logo A'rosa-je" />
                            </Link>
                        </li>
                        <div className='invisible'>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </ul>
                </header>
                <header className='h-12 md:h-14 bg-[#ffffff] rounded-b-3xl hidden lg:flex lg:justify-center lg:order-1'>
                    <ul className='flex flex-row items-center w-full justify-between mx-10'>
                        <li>
                            <Link href='/'>
                                <img src="/img/logo.png" width={72} alt="Logo A'rosa-je" />
                            </Link>
                        </li>
                        <div className='flex flex-row items-center justify-between gap-x-8 xl:gap-x-10 2xl:gap-x-16'>
                            <li className='font-bold'>
                                <Link href='/'>
                                    Accueil
                                </Link>
                            </li>
                            <li className='font-bold'>
                                <Link href='/map'>
                                    Carte
                                </Link>
                            </li>
                            <li className='font-bold'>
                                <Link href='/'>
                                    Messagerie
                                </Link>
                            </li>
                            <li className=''>
                                <Link href='/login'>
                                    <img src="/img/profil.svg" alt="Profil" />
                                </Link>
                            </li>
                        </div>
                    </ul>
                </header>
            </div>
            <nav className={`fixed bottom-0 bg-[#80CC28] lg:hidden h-12 md:h-14 w-full rounded-t-3xl flex justify-center transition-transform duration-50 ${!isVisible ? 'translate-y-full' : ''}`}>
                <ul className='flex flex-row items-center w-full justify-between mx-10'>
                    <li>
                        <Link href='/'>
                            <img src="/img/home.svg" alt="Accueil" />
                        </Link>
                    </li>
                    <li>
                        <Link href='/map'>
                            <img src="/img/map.svg" alt="Carte" />
                        </Link>
                    </li>
                    <li>
                        <div className='bg-[#ffffff] rounded-full p-2.5 md:p-3.5'>
                            <Link href='/plantes/ajouter'>
                                <img src="/img/camera.svg" alt="Camera" />
                            </Link>
                        </div>
                    </li>
                    <li>
                        <Link href='/' className=''>
                            <img src="/img/messagerie.svg" alt="Messagerie" />
                        </Link>
                    </li>
                    <li>
                        <Link href='/' className=''>
                            <img src="/img/settings.svg" alt="Paramètres" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
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