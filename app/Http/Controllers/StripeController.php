<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StripeController extends Controller
{
    public function index()
    {
        return Inertia::render('Payment/StripeCheckout', [
            'amount' => 2000,
        ]);
    }
}
