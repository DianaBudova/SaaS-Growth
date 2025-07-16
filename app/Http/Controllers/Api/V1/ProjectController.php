<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\UserCollection;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function get(): ProjectCollection
    {
        return new ProjectCollection(Project::all());
    }

    public function getMembers(int $id): UserCollection
    {
        $project = Project::with('users')->findOrFail($id);

        return new UserCollection($project->users);
    }
}
