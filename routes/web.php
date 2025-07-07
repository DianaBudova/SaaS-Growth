<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/register');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::group(['prefix' => 'company'], function () {
        Route::get('/', [CompanyController::class, 'index'])->name('company.index');
        Route::get('/show/{id}', [CompanyController::class, 'show'])->name('company.show');
        Route::post('/create', [CompanyController::class, 'store'])->name('company.store');
        Route::put('/update/{id}', [CompanyController::class, 'update'])->name('company.update');
        Route::delete('/delete/{id}', [CompanyController::class, 'destroy'])->name('company.destroy');
    });

    Route::group(['prefix' => 'project'], function () {
        Route::get('/', [ProjectController::class, 'index'])->name('project.index');
        Route::get('/show/{id}', [ProjectController::class, 'show'])->name('project.show');
        Route::post('/create', [ProjectController::class, 'store'])->name('project.store');
        Route::put('/update/{id}', [ProjectController::class, 'update'])->name('project.update');
        Route::delete('/delete/{id}', [ProjectController::class, 'destroy'])->name('project.destroy');
    });

    Route::group(['prefix' => 'profile'], function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/update', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/delete', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';
