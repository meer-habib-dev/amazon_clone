import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Image from "next/image";
import CheckOutProduct from "../components/CheckOutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise =  loadStripe(process.env.stripe_public_key)
const Checkout = () => {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const total = useSelector(selectTotal);
  const createCheckoutSession = async() => {
    const stripe = await stripePromise
    // create backend to create stripe session

    const createSession = await axios.post('/api/create-checkout-session',{
      items,
      email: session.user.email
    })
    // redirect user/customer to checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: createSession.data.id
    })
    if(result.error){
      alert(result.error.message)
    }
  }
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1040}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your amazon basket is empty"
                : "Amazon Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckOutProduct key={i} item={item} />
            ))}
          </div>
        </div>
        <div className="flex flex-col shadow-md p-10 bg-white">
          {
            items.length > 0 && (
              <>
              
              <h2 className="whitespace-nowrap">Sub Total ({items.length} : items )
              
              <span className="font-bold"> 
                <Currency quantity={total} currency='usd' />
                 </span>
              
              </h2>
              <button role='link' onClick={createCheckoutSession} disabled={!session} className={`button mt-3 ${!session && 'from-gray-500 to-gray-300 border-gray-200 text-gray-300 cursor-not-allowed' }`}>{!session ? 'Sign in to checkout' : 'Proceed to checkout'}</button>
              </>
            )
          }
        </div>
      </main>
    </div>
  );
};

export default Checkout;
