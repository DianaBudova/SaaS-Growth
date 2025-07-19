<?php

namespace App\Models;

use App\Models\CompanyRole;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Cache;

class CompanyUser extends Pivot
{
    protected $table = 'company_user';

    protected $fillable = [
        'company_id',
        'user_id',
        'role_id',
    ];

    public function role()
    {
        return $this->belongsTo(CompanyRole::class);
    }

    protected static function booted()
    {
        static::created(function ($pivot) {
            Cache::forget("company_{$pivot->company_id}_users");
        });

        static::deleted(function ($pivot) {
            Cache::forget("company_{$pivot->company_id}_users");
        });

        static::updated(function ($pivot) {
            Cache::forget("company_{$pivot->company_id}_users");
        });
    }
}
