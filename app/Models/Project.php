<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'company_id',
        'name',
        'description',
        'start_date',
        'end_date',
    ];

    public function company() {
        return $this->hasOne(Company::class);
    }

    public function users() {
        return $this->belongsToMany(User::class);
    }
}
