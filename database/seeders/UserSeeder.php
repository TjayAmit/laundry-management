<?php

namespace Database\Seeders;

use App\Models\Customer;
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
            'password' => bcrypt('password')
        ]);

        $admin->assignRole('admin');

        $owner = User::create([
            'name' => 'owner',
            'email' => 'owner@mailinator.com',
            'password' => bcrypt('password')
        ]);

        $owner->assignRole('owner');

        $staff = User::create([
            'name' => 'staff',
            'email' => 'staff@mailinator.com',
            'password' => bcrypt('password')
        ]);

        $staff->assignRole('staff');

        $customer = User::create([
            'name' => 'customer',
            'email' => 'customer@mailinator.com',
            'password' => bcrypt('password')
        ]);

        $customer->assignRole('customer');
    }
}
