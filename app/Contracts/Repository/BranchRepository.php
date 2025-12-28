<?php

namespace App\Contracts\Repository;

use App\Contracts\BranchRepositoryInterface;
use App\DTO\BranchDTO;
use App\Models\Branch;
use Illuminate\Database\Eloquent\Collection;

class BranchRepository implements BranchRepositoryInterface
{
    public function all(): Collection
    {
        return Branch::all();
    }

    public function create(BranchDTO $dto): Branch
    {
        return Branch::create($dto->toArray());
    }
}
