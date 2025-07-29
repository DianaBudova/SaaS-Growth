<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\PlanFeature;
use Illuminate\Database\Seeder;

class PlanFeatureSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            'starter_month' => Plan::where('stripe_price_id', config('plans.starter.month.stripe_price_id'))->first(),
            'starter_year'  => Plan::where('stripe_price_id', config('plans.starter.year.stripe_price_id'))->first(),
            'pro_month'     => Plan::where('stripe_price_id', config('plans.professional.month.stripe_price_id'))->first(),
            'pro_year'      => Plan::where('stripe_price_id', config('plans.professional.year.stripe_price_id'))->first(),
        ];

        $features = [
            'starter_month' => [
                ['Company Limit', 'company_limit', 3, 0],
                ['Projects Per Company Limit', 'projects_per_company_limit', 5, 0],
                ['Members Per Company Limit', 'members_per_company_limit', 5, 0],
                ['Members Per Project Limit', 'members_per_project_limit', 5, 0],
            ],
            'starter_year' => [
                ['Company Limit', 'company_limit', 5, 1],
                ['Projects Per Company Limit', 'projects_per_company_limit', 7, 1],
                ['Members Per Company Limit', 'members_per_company_limit', 7, 1],
                ['Members Per Project Limit', 'members_per_project_limit', 7, 1],
            ],
            'pro_month' => [
                ['Company Limit', 'company_limit', 20, 0],
                ['Projects Per Company Limit', 'projects_per_company_limit', 30, 0],
                ['Members Per Company Limit', 'members_per_company_limit', 50, 0],
                ['Members Per Project Limit', 'members_per_project_limit', 15, 0],
            ],
            'pro_year' => [
                ['Company Limit', 'company_limit', 30, 1],
                ['Projects Per Company Limit', 'projects_per_company_limit', 50, 1],
                ['Members Per Company Limit', 'members_per_company_limit', 100, 1],
                ['Members Per Project Limit', 'members_per_project_limit', 20, 1],
            ],
        ];

        foreach ($features as $planKey => $planFeatures) {
            $plan = $plans[$planKey];

            foreach ($planFeatures as [$name, $slug, $value, $resetInterval]) {
                PlanFeature::updateOrCreate(
                    [
                        'plan_id' => $plan->id,
                        'slug'    => $slug,
                    ],
                    [
                        'plan_id'        => $plan->id,
                        'name'           => $name,
                        'slug'           => $slug,
                        'value'          => $value,
                        'reset_interval' => $resetInterval,
                    ]
                );
            }
        }
    }
}
