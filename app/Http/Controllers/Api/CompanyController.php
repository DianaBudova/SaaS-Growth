<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CompanyController extends Controller
{
    public function get(): JsonResponse
    {
        return response()->json([
            'result' => Company::all()->toArray(),
        ]);
    }
}
