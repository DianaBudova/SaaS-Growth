<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InvitationController;
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
    Route::resource('company', CompanyController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::resource('project', ProjectController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::delete('/project/{projectId}/members/{memberId}', [ProjectController::class, 'removeMember'])->name('project.removeMember');

    Route::group(['prefix' => 'profile'], function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/update', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/delete', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::group(['prefix' => 'invitation'], function () {
        Route::post('/invite', [InvitationController::class, 'invite'])->name('invitation.invite');
        Route::get('/accept/{token}', [InvitationController::class, 'accept'])->name('invitation.accept');
    });
});

require __DIR__.'/auth.php';
