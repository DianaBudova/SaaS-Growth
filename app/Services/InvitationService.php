<?php

namespace App\Services;

use App\Mail\InviteUserMail;
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

        Mail::to($email)->send(new InviteUserMail($invitation));
    }
}
