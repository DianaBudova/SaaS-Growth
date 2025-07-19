<?php

namespace App\Models;

use App\Models\User;
use App\Models\CompanyUser;
use App\Observers\CompanyObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(CompanyObserver::class)]
class Company extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'owner_id',
        'plan_id',
    ];

    public function owner() {
        return $this->belongsTo(User::class);
    }

    public function plan() {
        return $this->belongsTo(Plan::class);
    }

    public function projects() {
        return $this->hasMany(Project::class);
    }

    public function users() {
        return $this->belongsToMany(User::class)
            ->using(CompanyUser::class)
            ->withPivot('role_id');
    }
}
