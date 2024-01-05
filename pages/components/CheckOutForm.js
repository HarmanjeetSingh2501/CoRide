import React from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckOutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            console.error('Error submitting payment element:', submitError);
            // Handle the submit error, e.g., show an error message to the user
            return;
        }

        try {
            const res = await fetch('/api/create-intent', {
                method: 'POST',
                body: JSON.stringify({
                    amount: amount
                }),
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch payment intent');
            }

            const { client_secret: clientSecret } = await res.json();

            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(PaymentElement),
                },
            });

            if (error) {
                console.error('Payment confirmation error:', error);
                // Handle the payment confirmation error, e.g., show an error message to the user
            } else {
                // Payment succeeded, you can navigate to a success page or handle it accordingly
                console.log('Payment successful!');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            // Handle the general error, e.g., show an error message to the user
        }
    };
   
    return (
        <div className='flex flex-col justify-center items-center w-full mt-6'>
            <h2 className='m-5 font-bold'>Amount to pay: {amount}</h2>
            <form onSubmit={handleSubmit} className='max-w-md'>
                <PaymentElement />
                <button className='w-full bg-black text-white p-2 rounded-lg mt-2' >Pay</button>
            </form>
        </div>
    );
};

export default CheckOutForm;
