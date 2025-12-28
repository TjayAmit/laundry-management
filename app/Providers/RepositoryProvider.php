<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Contracts\BranchRepositoryInterface;
use App\Contracts\LaundryRepositoryInterface;

use App\Contracts\Repository\BranchRepository;
use App\Contracts\Repository\LaundryRepository;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(BranchRepositoryInterface::class, BranchRepository::class);
        $this->app->bind(LaundryRepositoryInterface::class, LaundryRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
