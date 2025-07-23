<?php

namespace App\Listeners;

use App\Events\UserJoinedProject;
use App\Mail\Project\UserJoinedProjectMail;
use Illuminate\Support\Facades\Mail;

class ProjectUsersOfNewMemberNotification
{
    /**
     * Handle the event.
     */
    public function handle(UserJoinedProject $event): void
    {
        $newUser = $event->newUser;
        $project = $event->project;

        foreach ($project->users as $user) {
            if ($user->id !== $newUser->id) {
                Mail::to($user->email)->send(new UserJoinedProjectMail($newUser, $project));
            }
        }
    }
}
