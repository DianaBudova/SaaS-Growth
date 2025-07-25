import { fetchAPI } from '@/helpers';

interface PaymentIntentResult {
    clientSecret: string;
}

export async function createPaymentIntent(amount: number, paymentMethodId: string): Promise<PaymentIntentResult> {
    const res = await fetchAPI('/v1/create-payment-intent', {
        method: 'POST',
        body: {
            amount,
            payment_method: paymentMethodId,
        },
    });

    return res;
}