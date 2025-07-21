<?php

namespace App\Events;

use App\Models\Project;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserJoinedProject
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

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
