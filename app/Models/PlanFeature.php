<?php

namespace App\Models;

use App\Enums\IntervalEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlanFeature extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'plan_id',
        'name',
        'slug',
        'description',
        'value',
        'active',
        'reset_interval',
        'reset_period',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'plan_id' => 'integer',
        'name' => 'string',
        'slug' => 'string',
        'description' => 'string',
        'value' => 'string',
        'active' => 'boolean',
        'reset_interval' => 'integer',
        'reset_period' => IntervalEnum::class,
    ];

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }
}
