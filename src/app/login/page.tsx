import Header from '@/components/header';
import { LoginForm } from './login-form';
import { Suspense } from 'react';

export default async function LoginPage() {
    return (
        <>
            <section className='bg-login min-h-screen bg-cover flex justify-center items-center'>
                <div className='bg-white lg:w-10/12 xl:w-8/12 rounded-2xl my-10 w-11/12 text-center py-10'>
                    <div className='flex flex-col lg:flex-row justify-evenly'>
                        <div>
                            <h1 className='text-4xl md:text-6xl font-bold'>Connexion</h1>
                            <div className=' bg-white md:w-10/12 lg:w-full mx-auto lg:mx-8 my-10'>
                                <Suspense fallback={<>Loading...</>}>
                                    <LoginForm />
                                </Suspense>
                            </div>
                        </div>
                        <div>
                            <img src="img/plante.png" className="mx-auto lg:mx-0" alt="image d'une botaniste" />
                        </div>
                    </div>
                    <p className='text-[#4B4C4F]'>Pas encore <a href="/" className='hover:text-[#8BD635] duration-300 font-bold'>inscrit</a> ? 
                    <br />N’hésitez plus ! 
                    Apprenenez dès maintenant  à gérer vos budgets.</p>


                </div>
            </section>
        </>
    );
}
