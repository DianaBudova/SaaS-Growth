import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import PrimaryButton from '@/Components/PrimaryButton';
import useStripePayment from '@/hooks/useStripePayment';

export default function StripeCheckout({ amount }) {
    const { pay, loading } = useStripePayment();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ok = await pay(amount);

        alert(ok ? 'Success!' : 'Payment failed');
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <CardElement />
            <PrimaryButton type="submit" disabled={loading}>
                {loading ? 'Processing…' : 'Pay'}
            </PrimaryButton>
        </form>
    );
}
