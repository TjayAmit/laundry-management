<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * @throws \Exception
     */
    public function run(): void
    {
        $lockFile = storage_path('framework/seeding.lock');
        $completedFile = storage_path('framework/seeding.completed');

        // Check if seeding is already completed
        if (file_exists($completedFile) && config('app.env') !== 'local') {
            $this->command->info('Seeding already completed. Skipping...');
            return;
        }

        // Check if seeding is currently running
        if (file_exists($lockFile) && config('app.env') !== 'local') {
            $this->command->warn('Seeding is already in progress. Skipping...');
            return;
        }

        // Check if this is a fresh project
        $fresh_project = User::whereHas('roles', function($query) {
            $query->where('name', 'admin');
        })->doesntExist();

        if ($fresh_project) {
            try {
                // Create lock file
                file_put_contents($lockFile, date('Y-m-d H:i:s'));

                $this->call([
                    PermissionAndRoleSeeder::class,
                    UserSeeder::class,
                    LaundrySeeder::class,
                ]);

                // Create completed file and remove lock
                file_put_contents($completedFile, date('Y-m-d H:i:s'));
                unlink($lockFile);

                $this->command->info('Seeding completed successfully!');
            } catch (\Exception $e) {
                // Remove lock file on error
                if (file_exists($lockFile)) {
                    unlink($lockFile);
                }
                throw $e;
            }
        } else {
            $this->command->info('Admin user already exists. Skipping seeding...');
        }
    }
}
