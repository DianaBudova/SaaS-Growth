<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\Project\ProjectCreateRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    public function getAll(): Response
    {
        return Inertia::render('Project/Projects', []);
    }

    public function store(ProjectCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Project::create([
            'company_id'  => $validated['company_id'],
            'name'        => $validated['name'],
            'description' => $validated['description'],
            'start_date'  => $validated['start_date'],
            'end_date'    => $validated['end_date'],
        ]);

        return redirect()->route('project.index')->with('success', 'Project created successfully.');
    }
}
