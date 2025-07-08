<?php

namespace App\Services;

use App\Mail\InviteUserMail;
use Illuminate\Support\Facades\Mail;

class InvitationService
{
    public function send(string $email, array $data = []): void
    {
        Mail::to($email)->send(new InviteUserMail($email, $data));
    }
}
