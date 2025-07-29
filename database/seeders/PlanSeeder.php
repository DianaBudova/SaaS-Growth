<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Starter Plan',
                'stripe_price_id' => config('plans.starter.month.stripe_price_id'),
                'price' => 9.00,
                'interval' => 'month',
                'active' => true,
            ],
            [
                'name' => 'Starter Plan',
                'stripe_price_id' => config('plans.starter.year.stripe_price_id'),
                'price' => 72.00,
                'interval' => 'year',
                'active' => true,
            ],
            [
                'name' => 'Professional Plan',
                'stripe_price_id' => config('plans.professional.month.stripe_price_id'),
                'price' => 19.00,
                'interval' => 'month',
                'active' => true,
            ],
            [
                'name' => 'Professional Plan',
                'stripe_price_id' => config('plans.professional.year.stripe_price_id'),
                'price' => 192.00,
                'interval' => 'year',
                'active' => true,
            ],
        ];

        foreach ($plans as $plan) {
            Plan::updateOrCreate(
                ['stripe_price_id' => $plan['stripe_price_id']],
                $plan
            );
        }
    }
}
