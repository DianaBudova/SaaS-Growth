<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Requests\Company\CompanyCreateRequest;
use App\Http\Requests\Company\CompanyDestroyRequest;
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

        return Inertia::render('Company/Companies', [
            'companies' => $companies,
        ]);
    }

    public function store(CompanyCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Company::create([
            'name' => $validated['name'],
            'owner_id' => auth()->id(),
        ]);

        return redirect()->route('company.index')->with('success', 'Company created successfully.');
    }

    public function update(CompanyUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $existingCompany = Company::find($validated['id']);

        $existingCompany->update([
            'name' => $validated['name'],
        ]);

        $existingCompany->save();

        return redirect()->route('company.index')->with('success', 'Company updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $existingCompany = Company::findOrFail($id);

        $existingCompany->delete();

        return redirect()->route('company.index')->with('success', 'Company deleted successfully.');
    }
}
