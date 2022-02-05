import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Header from '../components/Header'
const success = () => {
    const router = useRouter()
    return (
        <div className='bg-red-100 h-screen'>
            <Header/>
            <main className='max-w-screen-lg mx-auto mt-10' >
                <div className='flex flex-col p-10 bg-white '  >
                    <div className='flex items-center space-x-2 mb-5'> 
                        <CheckCircleIcon className='text-green-500 h-10'/>
                        <h1 className='text-3xl'>Thank you, Your order has been confirmed!</h1>
                    </div>
                    <p>Thank you for shopping with us.We will send a confirmation once your item has shipped. If you would like to check the status of your order please press the link below.</p>
                    <button onClick={() => router.push('/orders')} className='button mt-8'>Go to my orders</button>
                </div>
            </main>
        </div>
    );
};

export default success;