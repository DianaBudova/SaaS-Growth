<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $fillable = [
        'email',
        'token',
        'project_id',
        'accepted'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
