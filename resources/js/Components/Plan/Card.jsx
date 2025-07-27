import { router } from '@inertiajs/react';
import PrimaryButton from "./PrimaryButton";

export default function Card({ plan }) {
    const handleCheckout = (e) => {
        e.preventDefault();

        router.post('/payment/checkout', {
            price_id: plan.stripe_price_id,
        }, {
            preserveScroll: true,
            preserveState: false,
        });
    };

    return (
        <div
            className="mx-auto w-full max-w-sm flex flex-col rounded-2xl border-4 border-transparent bg-stone-900 p-6 shadow-sm transition duration-300 hover:border-indigo-500"
        >
            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
                <p className="mt-1 text-sm text-stone-400 capitalize">{plan.interval} billing</p>
            </div>

            <div className="mb-6">
                <p className="text-4xl font-extrabold text-white">
                    ${plan.price}
                    <span className="ml-1 text-base font-medium text-stone-400">/ {plan.interval}</span>
                </p>
            </div>

            <div className="mt-auto">
                <PrimaryButton
                    className="w-full"
                    onClick={handleCheckout}
                >
                    Choose plan
                </PrimaryButton>
            </div>
        </div>
    );
}
