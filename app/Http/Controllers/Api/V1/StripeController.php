<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;

class StripeController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $amount = $request->input('amount');

            if (!is_numeric($amount) || $amount <= 0) {
                return response()->json(['error' => 'Invalid amount'], 400);
            }

            $paymentMethodId = $request->input('payment_method');

            if (!$paymentMethodId) {
                return response()->json(['error' => 'Payment method is required'], 400);
            }

            $user->createOrGetStripeCustomer();

            $stripe = Cashier::stripe();

            $paymentIntent = $stripe->paymentIntents->create([
                'amount' => intval($amount),
                'currency' => 'usd',
                'customer' => $user->stripe_id,
                'automatic_payment_methods' => [
                    'enabled' => true,
                    'allow_redirects' => 'never',
                ],
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
