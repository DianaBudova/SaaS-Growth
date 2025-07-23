<?php

namespace App\Events;

use App\Models\Project;
use App\Models\User;

class UserJoinedProject
{
    public User $newUser;
    public Project $project;

    /**
     * Create a new event instance.
     */
    public function __construct(User $newUser, Project $project)
    {
        $this->newUser = $newUser;
        $this->project = $project;
    }
}
