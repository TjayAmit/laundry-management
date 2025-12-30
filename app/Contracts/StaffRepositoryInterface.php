<?php

namespace App\Contracts;

use App\DTO\StaffDTO;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

interface StaffRepositoryInterface
{
    public function getAll(Request $request): Collection;
    public function create(StaffDTO $dto): Staff;
    public function update(Staff $branchUser, StaffDTO $dto): Staff;
    public function delete(Staff $branchUser): int;
}
