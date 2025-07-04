<?php

use App\Http\Controllers\Api\CompanyProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', function (Request $request) {
        return 'API is running!';
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/company/{id}/projects', [CompanyProjectController::class, 'get']);
});
