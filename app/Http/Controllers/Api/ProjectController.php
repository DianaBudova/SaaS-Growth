<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function get(): JsonResponse
    {
        return response()->json([
            'result' => Project::all()->toArray(),
        ]);
    }
}
