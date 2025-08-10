<?php

namespace App\Models;

use App\Enums\IntervalEnum;
use Illuminate\Database\Eloquent\Model;

class PlanSubscriptionFeature extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'subscription_id',
        'plan_feature_id',
        'value',
        'active',
        'reset_interval',
        'reset_period',
        'reset_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'subscription_id' => 'integer',
        'plan_feature_id' => 'integer',
        'value' => 'string',
        'active' => 'boolean',
        'reset_interval' => 'integer',
        'reset_period' => IntervalEnum::class,
        'reset_at' => 'datetime',
    ];

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }

    public function feature(): BelongsTo
    {
        return $this->belongsTo(PlanFeature::class);
    }
}
