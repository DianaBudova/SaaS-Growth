<?php

namespace App\Models;

use App\Models\ProjectRole;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Cache;

class ProjectUser extends Pivot
{
    protected $table = 'project_user';

    protected $fillable = [
        'project_id',
        'user_id',
        'role_id',
    ];

    public function role()
    {
        return $this->belongsTo(ProjectRole::class);
    }

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
