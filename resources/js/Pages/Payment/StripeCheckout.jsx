import React, { useState, useEffect } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import PrimaryButton from '@/Components/PrimaryButton';
import { fetchAPI } from '@/helpers';

export default function StripeCheckout({ amount }) {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAPI('/v1/create-payment-intent', {
            method: 'POST',
            body: { amount },
        })
            .then(data => setClientSecret(data.clientSecret))
            .catch(error => {
                console.error('Stripe error:', error);
                alert('Payment initialization failed');
            });
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setLoading(true);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
            },
        });

        if (result.error) {
            alert(result.error.message);
        } else if (result.paymentIntent?.status === 'succeeded') {
            alert('Payment successful!');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <CardElement />
            <PrimaryButton type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing…' : 'Pay'}
            </PrimaryButton>
        </form>
    );
}
