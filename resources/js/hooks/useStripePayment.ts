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
            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                throw new Error('Card element not found');
            }



            const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement!,
            });

            if (paymentMethodError) {
                throw new Error(paymentMethodError.message);
            }



            const { clientSecret } = await createPaymentIntent(amount, paymentMethod.id);            

            const { paymentIntent, error: paymentIntentError } = await stripe.confirmCardPayment(
                clientSecret,
                { payment_method: { card: cardElement! } },
            );

            if (paymentIntentError) {
                throw new Error(paymentIntentError.message);
            }



            return paymentIntent?.status === 'succeeded';
        } finally {
            setLoading(false);
        }
    };

    return { pay, loading };
}
