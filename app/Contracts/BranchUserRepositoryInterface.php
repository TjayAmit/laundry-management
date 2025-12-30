<?php

namespace App\Contracts;

use App\DTO\BranchUserDTO;
use App\Models\BranchUser;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface BranchUserRepositoryInterface
{
    public function getAll(Request $request): Collection;
    public function create(BranchUserDTO $dto): BranchUser;
    public function update(BranchUser $branchUser, BranchUserDTO $dto): BranchUser;
    public function delete(BranchUser $branchUser): int;
}
