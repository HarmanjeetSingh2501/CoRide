import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSearchParams } from 'next/navigation'
import checkOutForm from '../components/CheckOutForm'
import React from 'react'
import CheckOutForm from '../components/CheckOutForm'

const Payment = () => {
    const searchParam= useSearchParams()
    const amount=searchParam.get('amount')
    const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY)
    const options={
        mode:'payment',
        amount:Math.round(amount*100),
        currency:'usd'
    }
  return (
    <Elements stripe={stripePromise} options={options}>
       <CheckOutForm amount={amount}></CheckOutForm>
    </Elements>
  )
}

export default Payment