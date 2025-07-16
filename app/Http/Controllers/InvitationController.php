<?php

namespace App\Http\Controllers;

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
            Log::debug(1);
            $inviter->send($validated);
            Log::debug(2);

            return redirect()->back()->with('success', 'Invitation sent successfully.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    public function accept(string $token)
    {
        $invitation = Invitation::where('token', $token)->firstOrFail();

        if ($invitation->accepted) {
            return redirect()->route('login')->with('info', 'Invitation already accepted.');
        }

        // Можеш тут зареєструвати або залогінити користувача
        // або перенаправити на форму реєстрації з переданим токеном

        $invitation->update(['accepted' => true]);

        // Додай користувача до проєкту:
        $user = auth()->user();
        $invitation->project->users()->attach($user->id);

        return redirect()->route('project.show', $invitation->project_id)->with('success', 'You have joined the project!');
    }
}
