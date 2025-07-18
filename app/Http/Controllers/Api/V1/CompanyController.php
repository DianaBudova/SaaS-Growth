<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyCollection;
use App\Http\Resources\ProjectCollection;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CompanyController extends Controller
{
    public function get(): CompanyCollection
    {
        return new CompanyCollection(Cache::remember('companies', 60 * 60 * 24, function () {
            return Company::all();
        }));
    }

    public function getProjects(int $id): ProjectCollection
    {
        return new ProjectCollection(Cache::remember("company_{$id}_projects", 60 * 60 * 24, function () use ($id) {
            $company = Company::with('projects')->findOrFail($id);

            return $company->projects;
        }));
    }
}
