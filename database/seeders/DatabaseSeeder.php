<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $fresh_project = User::where('role', 'admin')->doesntExist();

        if ($fresh_project) {
            $this->call([
                PermissionAndRoleSeeder::class,
                UserSeeder::class,
                LaundrySeeder::class,
            ]);
        }
    }
}
