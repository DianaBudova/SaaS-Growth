<?php

namespace App\Http\Controllers;

use App\Http\Requests\InviteRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class InvitationController extends Controller
{
    public function invite(InviteRequest $request): RedirectResponse
    {
        $request->validated();

        try {

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Something went wrong.');
        }

        return redirect()->back()->with('success', 'Invitation sent successfully.');
    }
}
