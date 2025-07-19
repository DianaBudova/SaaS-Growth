<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyRole;
use App\Http\Requests\Company\CompanyCreateRequest;
use App\Http\Requests\Company\CompanyUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    public function index(): Response
    {
        $companies = Company::where('owner_id', auth()->id())->get();

        return Inertia::render('Company/Companies');
    }

    public function show(int $id): Response
    {
        $company = Company::find($id);

        if (! $company) {
            return redirect()->back()->with('error', 'Company not found.');
        }

        return Inertia::render('Company/Company', [
            'company' => $company,
        ]);
    }

    public function store(CompanyCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $userId = auth()->id();

        $createdCompany = Company::create([
            'name' => $validated['name'],
            'owner_id' => $userId,
        ]);

        if (! $createdCompany) {
            return redirect()->back()->with('error', 'Failed to create company.');
        }

        $userRole = CompanyRole::where('slug', 'owner')->first();

        if ($userId && $userRole) {
            $createdCompany->users()->attach($userId, [
                'role_id' => $userRole->id
            ]);
        }

        return redirect()->back()->with('success', 'Company created successfully.');
    }

    public function update(CompanyUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $existingCompany = Company::find($validated['id']);

        if (! $existingCompany) {
            return redirect()->back()->with('error', 'Company not found.');
        }

        $existingCompany->update([
            'name' => $validated['name'],
        ]);

        $existingCompany->save();

        return redirect()->back()->with('success', 'Company updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $existingCompany = Company::find($id);

        if (! $existingCompany) {
            return redirect()->back()->with('error', 'Company not found.');
        }

        $existingCompany->users()->detach();
        $existingCompany->delete();

        return redirect()->back()->with('success', 'Company deleted successfully.');
    }
}
