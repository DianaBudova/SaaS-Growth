<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Services\InvitationService;
use App\Http\Requests\InviteRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class InvitationController extends Controller
{
    public function invite(InviteRequest $request, InvitationService $inviter): RedirectResponse
    {
        $validated = $request->validated();

        try {
            $inviter->send($validated);

            return redirect()->back()->with('success', 'Invitation sent successfully.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Invitation was not sent.');
        }
    }

    public function accept(string $token, InvitationService $inviter): RedirectResponse
    {
        $invitation = Invitation::where('token', $token)->firstOrFail();

        if ($invitation->accepted) {
            return redirect()->route('project.show', $invitation->project_id)->with('info', 'Invitation already accepted.');
        }

        if (!auth()->check()) {
            session(['invitation_token' => $token]);
            return redirect()->route('register')->with('info', 'Please register or login to accept the invitation.');
        }

        if (auth()->user()->email !== $invitation->email) {
            auth()->logout();
            session()->invalidate();
            session()->regenerateToken();

            session(['invitation_token' => $token]);
            return redirect()->route('register')->with('error', 'This invitation is not for your email. Please use the email ' . $invitation->email . '.');
        }

        $invitation = $inviter->acceptWithUser($token, auth()->user());

        return redirect()->route('project.show', $invitation->project_id)->with('success', 'You have joined the project!');
    }
}
