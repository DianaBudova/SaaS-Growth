<?php

namespace App\Observers;

use App\Models\Project;
use Illuminate\Support\Facades\Cache;

class ProjectObserver
{
    public function saved(Project $project)
    {
        Cache::forget('projects');
        Cache::forget("project_{$project->id}_users");

        if ($project->company_id) {
            Cache::forget("company_{$project->company_id}_projects");
        }
    }

    public function deleting(Project $project)
    {
        Cache::forget('projects');
        Cache::forget("project_{$project->id}_users");

        if ($project->company_id) {
            Cache::forget("company_{$project->company_id}_projects");
        }
    }
}
