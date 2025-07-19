<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyCollection;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\UserCollection;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CompanyController extends Controller
{
    private const CACHE_EXPIRATION = 60 * 60 * 24; // 24 hours

    public function get(): CompanyCollection
    {
        return new CompanyCollection(Cache::remember('companies', static::CACHE_EXPIRATION, function () {
            return Company::all();
        }));
    }

    public function getProjects(int $id): ProjectCollection
    {
        return new ProjectCollection(Cache::remember("company_{$id}_projects", static::CACHE_EXPIRATION, function () use ($id) {
            $company = Company::with('projects')->find($id);

            if (! $company) {
                return collect();
            }

            return $company->projects;
        }));
    }

    public function getMembers(int $id): UserCollection
    {
        return new UserCollection(Cache::remember("company_{$id}_users", static::CACHE_EXPIRATION, function () use ($id) {
            $project = Company::with('users')->find($id);

            if (! $project) {
                return collect();
            }

            $project->users->each(function ($user) {
                $user->pivot->load('role');
            });
            
            return $project->users;
        }));
    }
}
