<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\ProjectRole;
use App\Models\Project;
use App\Models\User;
use App\Http\Requests\Project\ProjectCreateRequest;
use App\Http\Requests\Project\ProjectUpdateRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Project/Projects');
    }

    public function show(int $id): Response
    {
        $existingProject = Project::find($id);

        if (! $existingProject) {
            return redirect()->back()->with('error', 'Project not found.');
        }

        return Inertia::render('Project/Project', [
            'project' => $existingProject,
        ]);
    }

    public function store(ProjectCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $createdProject = Project::create([
            'company_id'  => $validated['company_id'],
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'start_date'  => $validated['start_date'] ?? null,
            'end_date'    => $validated['end_date'] ?? null,
        ]);

        if (! $createdProject) {
            return redirect()->back()->with('error', 'Failed to create project.');
        }

        $userId   = Company::find($validated['company_id'])?->owner_id;
        $user     = $userId ? User::find($userId) : null;
        $userRole = ProjectRole::where('slug', 'owner')->first();

        if ($user && $userRole) {
            $createdProject->users()->attach($userId, [
                'role_id' => $userRole->id
            ]);
        }

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function update(ProjectUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $existingProject = Project::find($validated['id']);

        if (! $existingProject) {
            return redirect()->back()->with('error', 'Project not found.');
        }

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
        $existingProject = Project::find($id);

        if (! $existingProject) {
            return redirect()->back()->with('error', 'Project not found.');
        }

        $existingProject->users()->detach();
        $existingProject->delete();

        return redirect()->back()->with('success', 'Project removed successfully.');
    }

    public function removeMember(int $projectId, int $memberId): RedirectResponse
    {
        $existingProject = Project::find($projectId);

        if (! $existingProject) {
            redirect()->back()->with('error', 'Project not found.');
        }

        $existingProject->users()->detach($memberId);

        return redirect()->back()->with('success', 'Member removed successfully.');
    }
}
