<?php

namespace App\Contracts\Repository;

use App\Contracts\BranchUserRepositoryInterface;
use App\DTO\BranchUserDTO;
use App\Models\BranchUser;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

class BranchUserRepository implements BranchUserRepositoryInterface
{
    public function getAll(Request $request): Collection
    {
        $user = $request->user();

        return BranchUser::with(['branch', 'user'])
            ->whereHas('branch.laundry', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();
    }

    public function create(BranchUserDTO $dto): BranchUser
    {
        return BranchUser::create($dto->toArray());
    }

    public function update(BranchUser $branchUser, BranchUserDTO $dto): BranchUser
    {
        $branchUser->update($dto->toArray());
        return $branchUser;
    }

    public function delete(BranchUser $branchUser): int
    {
        return $branchUser->delete();
    }
}
