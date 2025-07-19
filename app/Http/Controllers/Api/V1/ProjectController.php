<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\UserCollection;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProjectController extends Controller
{
    private const CACHE_EXPIRATION = 60 * 60 * 24; // 24 hours

    public function get(): ProjectCollection
    {
        return new ProjectCollection(Cache::remember('projects', static::CACHE_EXPIRATION, function () {
            return Project::all();
        }));
    }

    public function getMembers(int $id): UserCollection
    {
        return new UserCollection(Cache::remember("project_{$id}_users", static::CACHE_EXPIRATION, function () use ($id) {
            $project = Project::with('users')->find($id);

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
