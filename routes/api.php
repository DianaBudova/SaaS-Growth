<?php

use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::get('/', fn() => response()->json(['message' => 'API is running!']));
    Route::get('/user', fn(Request $request) => $request->user());

    Route::get('/companies', [CompanyController::class, 'get']);
    Route::get('/companies/{id}/projects', [CompanyController::class, 'getProjects']);

    Route::get('/projects', [ProjectController::class, 'get']);
    Route::get('/projects/{id}/members', [ProjectController::class, 'getMembers']);
});
