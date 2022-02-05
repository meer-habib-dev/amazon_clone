import moment from 'moment';
import { getSession, useSession } from 'next-auth/client';
import React from 'react';
import db from '../../firebase';
import Header from '../components/Header';
import Order from '../components/Order';

const Orders = ({ orders }) => {
    console.log(orders);
    const session = useSession()
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl mb-2 border-b pb-1 border-yellow-400'>Your Orders</h1>
                {
                    session ? <h2>X Orders</h2> : <h2>Please sign in to see your orders</h2>
                }
                <div className='mt-5 space-y-4'>
                    {
                        orders.map(({ id, images, timestamp, amount, amountShipping, items }) => <Order
                            id={id}
                            items={items}
                            images={images}
                            amount={amount}
                            amountShipping={amountShipping}
                            timestamp={timestamp}
                        />)
                    }
                </div>
            </main>
        </div>
    );
};

export default Orders;

export async function getServerSideProps (context) {
   
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // get the users credientials to see the orders 
    const session = await getSession(context);
    console.log('sesss',session);
    // if (!session) {
    //     console.log('kichu pai nai');
    //     return {
    //         props: {}
    //     }
    // }

    const stripeOrders = await db.collection('users').doc('meerhabib200@gmail.com').collection('orders').orderBy('timestamp', 'desc').get();
    
    // stripe order
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100
                })
            ).data,
        }))
        )
        return {
        props: {
            orders 
        }
    }
}