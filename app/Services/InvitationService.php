<?php

namespace App\Services;

use App\Models\ProjectRole;
use App\Models\User;
use App\Mail\Project\ProjectInviteUserMail;
use App\Models\Invitation;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class InvitationService
{
    public function send(array $data = []): void
    {
        $token = Str::uuid();

        $invitation = Invitation::create([
            'email' => $data['email'],
            'token' => $token,
            'project_id' => $data['project_id'],
        ]);

        Mail::to($data['email'])->send(new ProjectInviteUserMail($invitation));
    }

    public function accept(string $token): Invitation
    {
        $invitation = Invitation::where('token', $token)->firstOrFail();

        if ($invitation->accepted) {
            return $invitation;
        }

        $invitation->update(['accepted' => true]);

        return $invitation;
    }

    public function acceptWithUser(string $token, User $user, ProjectRole $userRole): Invitation
    {
        $invitation = $this->accept($token);
        $invitation->project->users()->attach($user->id, [
            'role_id' => $userRole->id,
        ]);

        return $invitation;
    }

    public function handlePostRegistrationInvitation(User $user, ProjectRole $userRole): ?Invitation
    {
        $token = session('invitation_token');

        if (!$token) {
            return null;
        }

        session()->forget('invitation_token');

        return $this->acceptWithUser($token, $user, $userRole);
    }

    public function isAccepted(string $token): bool
    {
        $invitation = Invitation::where('token', $token)->first();

        return $invitation ? $invitation->accepted : false;
    }
}
