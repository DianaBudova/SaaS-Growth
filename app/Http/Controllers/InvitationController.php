<?php

namespace App\Http\Controllers;

use App\Services\InvitationService;
use App\Http\Requests\InviteRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class InvitationController extends Controller
{
    public function invite(InviteRequest $request, InvitationService $inviter): RedirectResponse
    {
        $request->validated();

        try {
            $inviter->send($validated['email'], $validated);

            return redirect()->back()->with('success', 'Invitation sent successfully.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }
}
