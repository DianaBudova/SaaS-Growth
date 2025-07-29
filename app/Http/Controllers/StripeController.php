<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StripeController extends Controller
{
    public function checkout(Request $request)
    {
        $plan = $request->input('plan');

        if (!$plan) {
            return redirect()->back()->with('error', 'Missing plan identifier.');
        }

        return Inertia::render('Payment/Stripe/Checkout', [
            'plan' => $plan,
        ]);
    }

    public function success()
    {
        return Inertia::render('Payment/Stripe/Success');
    }

    public function failed()
    {
        return Inertia::render('Payment/Stripe/Failed');
    }
}
