import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import type { StripeCardElement } from '@stripe/stripe-js';

import { subscribe } from '@/services/stripe';

export default function useStripeSubscription() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const startSubscription = async (priceId: string): Promise<boolean> => {
        if (!stripe || !elements) return false;

        setLoading(true);
        try {
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) throw new Error('Card element not found');

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement as StripeCardElement,
            });
            if (error || !paymentMethod) throw new Error(error?.message || 'Unable to create payment method');

            const { status } = await subscribe(priceId, paymentMethod.id);

            return status === 'active';
        } catch (e) {
            console.error(e);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { startSubscription, loading };
}
