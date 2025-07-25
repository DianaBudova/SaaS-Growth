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
                'stripe_price_id' => 'price_1Roq7cH0N9gUKH3iUbpiruz7',
                'price' => 9.00,
                'interval' => 'monthly',
                'active' => true,
            ],
            [
                'name' => 'Starter Plan',
                'stripe_price_id' => 'price_1Roq8fH0N9gUKH3igt6Kq2JJ',
                'price' => 72.00,
                'interval' => 'yearly',
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
