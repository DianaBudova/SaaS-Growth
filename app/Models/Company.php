<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
