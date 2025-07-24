<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripeController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $amount = $request->input('amount');

            if (!is_numeric($amount) || $amount <= 0) {
                return response()->json(['error' => 'Invalid amount'], 400);
            }

            $paymentIntent = PaymentIntent::create([
                'amount' => intval($amount),
                'currency' => 'usd',
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
