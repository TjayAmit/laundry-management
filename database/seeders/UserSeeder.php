<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'admin',
            'email' => 'tristanjayamit0813@gmail.com',
            'password' => bcrypt('tristanjayamit0813')
        ]);

        $admin->assignRole('admin');
    }
}
