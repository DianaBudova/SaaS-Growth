<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CompanyProjectController extends Controller
{
    public function get(int $id): JsonResponse
    {
        $company = Company::with('projects')->findOrFail($id);

        return response()->json([
            'projects' => $company->projects,
        ]);
    }
}
