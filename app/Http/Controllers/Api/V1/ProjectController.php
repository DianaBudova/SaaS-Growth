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
    public function get(): ProjectCollection
    {
        return new ProjectCollection(Cache::remember('projects', 60 * 60 * 24, function () {
            return Project::all();
        }));
    }

    public function getMembers(int $id): UserCollection
    {
        return new UserCollection(Cache::remember("project_{$id}_users", 60 * 60 * 24, function () use ($id) {
            $project = Project::with('users')->findOrFail($id);
            
            return $project->users;
        }));
    }
}
