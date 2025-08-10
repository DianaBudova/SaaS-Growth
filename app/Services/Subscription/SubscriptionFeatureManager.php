<?php

namespace App\Services\Subscription;

use App\Models\Plan;
use App\Models\Subscription;

class SubscriptionFeatureManager
{
    public function syncFeaturesWithPlan(Subscription $subscription): void
    {
        $plan = $subscription->plan;

        if (! $plan) {
            return;
        }

        $subscription->features()->sync($plan->features);
    }
}