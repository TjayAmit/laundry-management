<?php

use App\Http\Controllers\BranchUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\BranchController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(BranchController::class)->group(function () {
        Route::get('branches', 'index')->name('branches.index');
        Route::get('branches/create', 'create')->name('branches.create');
        Route::post('branches', 'store')->name('branches.store');
    });

    Route::controller(BranchUserController::class)->group(function () {
        Route::get('staffs', 'index')->name('staffs.index');
        Route::get('staffs/create', 'create')->name('staffs.create');
        Route::post('staffs', 'store')->name('staffs.store');
    });
});

require __DIR__.'/settings.php';
