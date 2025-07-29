import React from 'react';
import { router, usePage } from '@inertiajs/react';
import { CardElement } from '@stripe/react-stripe-js';
import PrimaryButton from '@/Components/PrimaryButton';
import useStripeSubscription from '@/hooks/useStripeSubscription';

export default function Checkout() {
    const { plan } = usePage().props;
    const { startSubscription, loading } = useStripeSubscription();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ok = await startSubscription(plan.stripe_price_id);

        const redirectUrl = ok ? '/payment/success' : '/payment/failed';
        redirectTo(redirectUrl);
    };

    const redirectTo = (url) => {
        router.visit(url, { replace: true });
    };

    return (
        <div className="relative flex justify-center min-h-screen w-full pt-12 overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[450px] w-[850px] rounded-full bg-indigo-300 opacity-20 blur-[100px]"></div>
            
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md h-fit space-y-6 border border-stone-200">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-1">{plan.name}</h2>
                    <p className="text-sm text-stone-600">
                        Billed <span className="capitalize">{plan.interval}</span>
                    </p>
                    <p className="text-3xl font-semibold text-indigo-600 mt-2">
                        ${plan.price}
                        <span className="text-base text-stone-500 font-normal">/{plan.interval === 'yearly' ? 'yr' : 'mo'}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="p-4 border border-stone-300 rounded-lg bg-stone-50">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#333',
                                        fontFamily: 'Inter, sans-serif',
                                        '::placeholder': {
                                            color: '#aaa',
                                        },
                                    },
                                    invalid: {
                                        color: '#e53935',
                                    },
                                },
                            }}
                        />
                    </div>

                    <PrimaryButton
                        type="submit"
                        disabled={loading}
                        className="w-full justify-center"
                    >
                        {loading ? 'Processing…' : `Subscribe Now`}
                    </PrimaryButton>
                </form>

                <p className="text-xs text-stone-400 text-center">
                    Payments are securely processed via Stripe.
                </p>
            </div>
        </div>
    );
}
