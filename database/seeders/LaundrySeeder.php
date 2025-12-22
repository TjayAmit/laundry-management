<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Laundry;
use App\Models\User;
use Illuminate\Database\Seeder;

class LaundrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $owner = User::where('name', 'owner')->first();

        $company = Laundry::create([
            'user_id' => $owner->id,
            'name' => "Wash Me Nei Nei",
            'email' => "washme@mailinator.com",
            'contact' => null,
            'address' => "Lunzuran"
        ]);

        Branch::create([
            'laundry_id' => $company->id,
            'name' => "San Roque Washy",
            'address' => "San Roque",
            'capacity_limit' => 25,
            'warning_threshold' => 20
        ]);
    }
}
