<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompanyRole;

class CompanyRoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Owner',
                'slug' => 'owner',
            ],
            [
                'name' => 'Admin',
                'slug' => 'admin',
            ],
            [
                'name' => 'Manager',
                'slug' => 'manager',
            ],
            [
                'name' => 'Employee',
                'slug' => 'employee',
            ],
        ];

        foreach ($roles as $role) {
            CompanyRole::updateOrCreate(
                ['slug' => $role['slug']],
                $role
            );
        }
    }
}
