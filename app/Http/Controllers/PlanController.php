<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index()
    {
        $mappedPlans = Plan::all()->map(function ($plan) {
            return [
                'name'            => $plan->name,
                'price'           => $plan->price,
                'stripe_price_id' => $plan->stripe_price_id,
                'interval'        => $plan->interval,
            ];
        });

        return Inertia::render('Plan/Plans', [
            'plans' => $mappedPlans
        ]);
    }
}