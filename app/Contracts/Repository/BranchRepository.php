<?php

namespace App\Contracts\Repository;

use App\Contracts\BranchRepositoryInterface;
use App\DTO\BranchDTO;
use App\Models\Branch;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

class BranchRepository implements BranchRepositoryInterface
{
    public function all(Request $request): Collection
    {
        return Branch::all()->map(fn($branch) => [
            'id' => $branch->id,
            'name' => $branch->name,
            'address' => $branch->address,
            'activeOrders' => 0,
            'toBeReleased' => 0,
            'todayIncome' => 0,
            'status' => 'open'
        ]);
    }

    public function create(BranchDTO $dto): Branch
    {
        return Branch::create($dto->toArray());
    }
}
