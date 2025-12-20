<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionAndRoleSeeder extends Seeder
{
    public function run(): void
    {
        $guard = 'web';

        // -------------------------
        // CUSTOMER
        // -------------------------
        $customerRole = Role::firstOrCreate([
            'name' => 'customer',
            'guard_name' => $guard,
        ]);

        $customerPermissions = [
            'read order',
            'cancel order',
            'edit user',
        ];

        $this->syncPermissions($customerRole, $customerPermissions, $guard);

        // -------------------------
        // STAFF
        // -------------------------
        $staffRole = Role::firstOrCreate([
            'name' => 'staff',
            'guard_name' => $guard,
        ]);

        $staffPermissions = [
            'read order',
            'edit order',
            'cancel order',
            'create order',
            'read user detail',
            'read transaction',
        ];

        $this->syncPermissions($staffRole, $staffPermissions, $guard);

        // -------------------------
        // OWNER
        // -------------------------
        $ownerRole = Role::firstOrCreate([
            'name' => 'owner',
            'guard_name' => $guard,
        ]);

        $ownerPermissions = array_merge($staffPermissions, [
            'create branch',
            'read branch',
            'edit branch',
            'delete branch',
        ]);

        $this->syncPermissions($ownerRole, $ownerPermissions, $guard);

        // -------------------------
        // ADMIN
        // -------------------------
        $adminRole = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => $guard,
        ]);

        $adminPermissions = array_merge(
            $customerPermissions,
            $staffPermissions,
            $ownerPermissions,
            [
                'create user',
                'read user',
                'update user',
                'delete user',
            ]
        );

        $this->syncPermissions($adminRole, $adminPermissions, $guard);
    }

    private function syncPermissions(Role $role, array $permissions, string $guard): void
    {
        foreach ($permissions as $permissionName) {
            $permission = Permission::firstOrCreate([
                'name' => $permissionName,
                'guard_name' => $guard,
            ]);

            $role->givePermissionTo($permission);
        }
    }
}
