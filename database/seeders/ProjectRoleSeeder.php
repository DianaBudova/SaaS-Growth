<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProjectRole;

class ProjectRoleSeeder extends Seeder
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
                'name' => 'Developer',
                'slug' => 'developer',
            ],
            [
                'name' => 'Viewer',
                'slug' => 'viewer',
            ],
        ];

        foreach ($roles as $role) {
            ProjectRole::updateOrCreate(
                ['slug' => $role['slug']],
                $role
            );
        }
    }
}
