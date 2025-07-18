<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Cache;

class ProjectUser extends Pivot
{
    protected static function booted()
    {
        static::created(function ($pivot) {
            Cache::forget("project_{$pivot->project_id}_users");
        });

        static::deleted(function ($pivot) {
            Cache::forget("project_{$pivot->project_id}_users");
        });

        static::updated(function ($pivot) {
            Cache::forget("project_{$pivot->project_id}_users");
        });
    }
}
