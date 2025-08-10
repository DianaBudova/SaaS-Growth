import { fetchAPI } from '@/helpers';
import { SubscribeResult } from '@/contracts/api/subscribe-result';

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
