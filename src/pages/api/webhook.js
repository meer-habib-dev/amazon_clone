import { buffer } from "micro"
import * as admin from 'firebase-admin'
// import { app } from "firebase-admin"
import { session } from "next-auth/client"

   // secure a connect to firebase with the backend     
const serviceAccount = require('../../../permissions.json')

const app = !admin.apps.length ? admin?.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()

// establish connection to stripe 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endPointSecret = process.env.STRIPE_SIGNING_SECRET

const fullFillOrder = async (session) => {
    return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set({
        amount: session.amount_total/100,
        amount_shipping: session.total_details.amount_shipping /100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    }).then(() => console.log(`success: order ${session.id} has been added to the DB`))
}

export default async (req, res) => {
const requestBuffer =   await buffer(req);

    if(req.method === 'POST'){
const payload = requestBuffer.toString();
const sig = req.headers['stripe-signature']

 let event 
//  verify the event came from stripe
 try {
     event = stripe.webhooks.constructEvent(payload, sig, endPointSecret)

 } catch  (error){
     console.log('error message', error)
     return res.status(400).send(`Webhook Error: ${error.message}`)
 }


// handle the event checkout session 
if(event.type === 'checkout.session.completed'){
    const session = event.data.object 

    // Fullfill the order 
    return fullFillOrder(session).then(() => res.status(200)).catch(error => res.status(400).send(`webhook error: ${error.message}`))

        }

    }
}
export const config= {
    api: {
        bodyParser:false,
        externalResolver:true
    }
}