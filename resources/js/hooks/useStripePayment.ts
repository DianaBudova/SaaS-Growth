import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '@/services/stripe';

export default function useStripePayment() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const pay = async (amount: number): Promise<boolean> => {
        if (!stripe || !elements) {
            return false;
        }

        setLoading(true);

        try {
            const { clientSecret } = await createPaymentIntent(amount);

            const cardElement = elements.getElement(CardElement);

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                { payment_method: { card: cardElement! } },
            );

            if (error) {
                throw new Error(error.message);
            }

            return paymentIntent?.status === 'succeeded';
        } finally {
            setLoading(false);
        }
    };

    return { pay, loading };
}
