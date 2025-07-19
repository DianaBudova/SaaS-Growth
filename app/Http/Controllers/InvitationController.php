<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectRole;
use App\Models\User;
use App\Models\Invitation;
use App\Services\InvitationService;
use App\Http\Requests\InviteRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class InvitationController extends Controller
{
    public function invite(InviteRequest $request, InvitationService $inviter): RedirectResponse
    {
        $validated = $request->validated();

        try {
            $project = Project::with('users')
                ->find($validated['project_id']);

            $isAlreadyJoined = $project->users->contains('email', $validated['email']);

            if ($isAlreadyJoined) {
                return redirect()->back()->with('info', 'User with email ' . $validated['email'] . ' already in this project.');
            }

            $inviter->send($validated);

            return redirect()->back()->with('success', 'Invitation sent successfully.');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return redirect()->back()->with('error', 'Invitation was not sent.');
        }
    }

    public function accept(string $token, InvitationService $inviter): RedirectResponse
    {
        $invitation = Invitation::where('token', $token)->first();

        if (! $invitation) {
            return redirect()->route('dashboard')->with('error', 'Invitation not found.');
        }

        if ($invitation->accepted) {
            return redirect()->route('project.show', $invitation->project_id)->with('info', 'Invitation already accepted.');
        }

        if (! auth()->check()) {
            session(['invitation_token' => $token]);
            return redirect()->route('register')->with('info', 'Please register or login to accept the invitation.');
        }

        $user = auth()->user();

        if ($user->projects()->where('projects.id', $invitation->project_id)->exists()) {
            if ($user->email === $invitation->email) {
                return redirect()->route('project.show', $invitation->project_id)->with('info', 'You are already a member of this project.');
            }
        }

        if ($user->email !== $invitation->email) {
            auth()->logout();
            session()->invalidate();
            session()->regenerateToken();

            session(['invitation_token' => $token]);
            return redirect()->route('register')->with('error', 'This invitation is not for your email. Please use the email ' . $invitation->email . '.');
        }

        $userRole = ProjectRole::where('slug', 'viewer')->first();
        $invitation = $inviter->acceptWithUser($token, $user, $userRole);

        return redirect()->route('project.show', $invitation->project_id)->with('success', 'You have joined the project!');
    }
}
