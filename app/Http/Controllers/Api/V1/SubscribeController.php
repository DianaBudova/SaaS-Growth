<?php

namespace App\Http\Controllers\Api\V1;

use App\Services\Subscription\SubscriptionEndDateService;
use App\Services\Subscription\SubscriptionFeatureManager;
use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Http\Requests\Api\V1\SubscribeRequest;
use Laravel\Cashier\Cashier;

class SubscribeController extends Controller
{
    public function __construct(
        private SubscriptionEndDateService $endDateService,
        private SubscriptionFeatureManager $featureService
    ) {}

    public function __invoke(SubscribeRequest $request): SubscriptionResource
    {
        $user = $request->user();

        $priceId = $request->input('stripe_price_id');
        $paymentMethodId = $request->input('payment_method');

        $user->createOrGetStripeCustomer();

        $user->addPaymentMethod($paymentMethodId);
        $user->updateDefaultPaymentMethod($paymentMethodId);

        try {
            $subscription = $user
                ->newSubscription('default', $priceId)
                ->create($paymentMethodId);

            $this->endDateService->setEndDateSubscription($subscription);
            $this->featureService->syncFeaturesWithPlan($subscription);

            return new SubscriptionResource($subscription);
        } catch (\Throwable $e) {
            report($e);
            return response()->json(['error' => 'Unable to create subscription.'], 500);
        }
    }
}
