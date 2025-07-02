<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\Project\ProjectCreateRequest;
use App\Http\Requests\Project\ProjectUpdateRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Project/Projects', []);
    }

    public function store(ProjectCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Project::create([
            'company_id'  => $validated['company_id'],
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'start_date'  => $validated['start_date'] ?? null,
            'end_date'    => $validated['end_date'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function update(ProjectUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $existingProject = Project::findOrFail($validated['id']);

        $existingProject->update([
            'company_id'  => $validated['company_id'],
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'start_date'  => $validated['start_date'] ?? null,
            'end_date'    => $validated['end_date'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Project updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        Project::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Project removed successfully.');
    }
}
