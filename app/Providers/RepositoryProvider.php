<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Contracts\BranchRepositoryInterface;
use App\Contracts\LaundryRepositoryInterface;
use App\Contracts\Repository\BranchUserRepository;

use App\Contracts\Repository\BranchRepository;
use App\Contracts\Repository\LaundryRepository;
use App\Contracts\BranchUserRepositoryInterface;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(BranchRepositoryInterface::class, BranchRepository::class);
        $this->app->bind(LaundryRepositoryInterface::class, LaundryRepository::class);
        $this->app->bind(BranchUserRepositoryInterface::class, BranchUserRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
