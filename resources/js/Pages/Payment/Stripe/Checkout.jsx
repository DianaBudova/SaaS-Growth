import React from 'react';
import { router, usePage } from '@inertiajs/react';
import { CardElement } from '@stripe/react-stripe-js';
import PrimaryButton from '@/Components/PrimaryButton';
import useStripeSubscription from '@/hooks/useStripeSubscription';

export default function Checkout() {
    const { price_id } = usePage().props;

    const { startSubscription, loading } = useStripeSubscription();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ok = await startSubscription(price_id);

        const redirectUrl = ok ? '/payment/success' : '/payment/failed';
        redirectTo(redirectUrl);
    };

    const redirectTo = (url) => {
        router.visit(url, {
            replace: true,
        });
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
