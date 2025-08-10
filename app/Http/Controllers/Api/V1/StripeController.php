<?php

namespace App\Http\Controllers\Api\V1;

use App\Services\Subscription\SubscriptionEndDateService;
use App\Services\Subscription\SubscriptionFeatureManager;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;

class StripeController extends Controller
{
    public function __construct(
        private SubscriptionEndDateService $endDateService,
        private SubscriptionFeatureManager $featureService
    ) {}

    public function subscribe(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $priceId = $request->input('stripe_price_id');

        if (!$priceId) {
            return response()->json(['error' => 'Missing plan identifier.'], 422);
        }

        $paymentMethodId = $request->input('payment_method');

        if (!$paymentMethodId) {
            return response()->json(['error' => 'Payment method is required'], 422);
        }

        $user->createOrGetStripeCustomer();

        $user->addPaymentMethod($paymentMethodId);
        $user->updateDefaultPaymentMethod($paymentMethodId);

        try {
            $subscription = $user
                ->newSubscription('default', $priceId)
                ->create($paymentMethodId);

            $this->endDateService->setEndDateSubscription($subscription);
            $this->featureService->syncFeaturesWithPlan($subscription);

            return response()->json([
                'status' => $subscription->stripe_status
            ]);
        } catch (\Throwable $e) {
            report($e);
            return response()->json(['error' => 'Unable to create subscription.'], 500);
        }
    }
}
