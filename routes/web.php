<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\Project\ProjectInvitationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('payment')->group(function () {
    Route::get('/success', [StripeController::class, 'success'])->name('stripe.success');
    Route::get('/failed',  [StripeController::class, 'failed'])->name('stripe.failed');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
        ->middleware('verified')
        ->name('dashboard');

    Route::post('/payment/checkout', [StripeController::class, 'checkout'])
        ->name('stripe.checkout');

    Route::resource('company', CompanyController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::resource('project', ProjectController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::prefix('project')->group(function () {
        Route::post('/invite', [ProjectInvitationController::class, 'invite'])->name('project.invite');
        Route::get('/accept/{token}', [ProjectInvitationController::class, 'accept'])->name('project.accept');

        Route::delete('/{projectId}/members/{memberId}', [ProjectController::class, 'removeMember'])->name('project.remove_member');
    });

    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/update', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/delete', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('plans')->group(function () {
        Route::get('/', [PlanController::class, 'index'])->name('plans.index');
    });
});

Route::get('/', function () {
    return redirect('/register');
});

require __DIR__.'/auth.php';
