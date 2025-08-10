<?php

namespace App\Services\Subscription;

use App\Models\Plan;
use App\Models\Subscription;

class SubscriptionEndDateService
{
    public function setEndDateSubscription(Subscription $subscription): void
    {
        $interval = $subscription->plan?->interval;

        if (! $interval) {
            return;
        }

        $endsAt = now()->add($interval->toCarbonInterval());

        $subscription->update([
            'ends_at' => $endsAt,
        ]);
    }
}