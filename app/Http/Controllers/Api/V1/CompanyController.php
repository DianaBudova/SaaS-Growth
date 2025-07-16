<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyCollection;
use App\Http\Resources\ProjectCollection;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function get(): CompanyCollection
    {
        return new CompanyCollection(Company::all());
    }

    public function getProjects(int $id): ProjectCollection
    {
        $company = Company::with('projects')->findOrFail($id);

        return new ProjectCollection($company->projects);
    }
}
