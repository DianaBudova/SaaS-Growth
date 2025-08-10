<?php

namespace App\Models;

use App\Enums\IntervalEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Plan extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'stripe_price_id',
        'price',
        'interval',
        'active',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'stripe_price_id' => 'string',
        'price' => 'decimal:2',
        'interval' => IntervalEnum::class,
        'active' => 'boolean',
    ];

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(PlanFeature::class);
    }
}
