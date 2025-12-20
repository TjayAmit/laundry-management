<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionAndRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::create(['name' => 'customer']);

        $customerPermissions = [
            'read order',
            'cancel order',
            'edit user'
        ];


        Permission::insert($customerPermissions)->each(function ($permission) use ($role) {
            $role->givePermissionTo($permission);
        });

        $role = Role::create(['name' => 'staff']);

        $staffPermissions = [
            'read order',
            'edit order',
            'cancel order',
            'create order',
            'read user detail',
            'read transaction'
        ];

        Permission::insert($staffPermissions)->each(function ($permission) use ($role) {
            $role->givePermissionTo($permission);
        });

        $role = Role::create(['name' => 'owner']);

        $ownerP = [
            'create branch',
            'read branch',
            'edit branch',
            'delete branch'
        ];

        $ownerPermissions = array_merge($ownerP, $staffPermissions);

        Permission::insert($ownerPermissions)->each(function ($permission) use ($role) {
            $role->givePermissionTo($permission);
        });

        $role = Role::create(['name' => 'admin']);

        $adminP = [
            'create user',
            'read user',
            'update user',
            'delete user'
        ];

        $permissions = array_merge($adminP, $staffPermissions, $ownerPermissions, $customerPermissions);

        Permission::insert($permissions)->each(function ($permission) use ($role) {
            $role->givePermissionTo($permission);
        });
    }
}
