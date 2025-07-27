import { fetchAPI } from '@/helpers';

interface SubscribeResult {
    status: 'active' | 'requires_action';
    redirect_url?: string;
}

export async function subscribe(priceId: string, paymentMethodId: string): Promise<SubscribeResult> {
    const res = await fetchAPI('/v1/subscribe', {
        method: 'POST',
        body: {
            stripe_price_id: priceId,
            payment_method: paymentMethodId
        },
    });

    return res as SubscribeResult;
}
