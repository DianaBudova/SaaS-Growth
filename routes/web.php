<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\Project\ProjectInvitationController;
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

    Route::group(['prefix' => 'project'], function () {
        Route::post('/invite', [ProjectInvitationController::class, 'invite'])->name('project.invite');
        Route::get('/accept/{token}', [ProjectInvitationController::class, 'accept'])->name('project.accept');

        Route::delete('/{projectId}/members/{memberId}', [ProjectController::class, 'removeMember'])->name('project.remove_member');
    });



    Route::group(['prefix' => 'profile'], function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/update', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/delete', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    

    Route::get('/checkout', [StripeController::class, 'index'])->name('stripe.index');
});

require __DIR__.'/auth.php';
