<?php

namespace App\Models;

use Laravel\Cashier\Subscription as BaseSubscription;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends BaseSubscription
{
    public function plan(): BelongsTo
    {
        return $this->belongsTo(
            Plan::class,
            'stripe_price',
            'stripe_price_id'
        );
    }
}