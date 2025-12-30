<?php

namespace App\Contracts\Repository;

use App\Contracts\StaffRepositoryInterface;
use App\DTO\StaffDTO;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class StaffRepository implements StaffRepositoryInterface
{
    public function getAll(Request $request): Collection
    {
        $user = $request->user();

        return Staff::with(['branch:id,name', 'user:id,name,email'])
            ->whereHas('branch.laundry', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();
    }

    public function create(StaffDTO $dto): Staff
    {
        $user = User::create($dto->toArray());
        $dto->user_id = $user->id;

        return Staff::create($dto->toArray());
    }

    public function update(Staff $branchUser, StaffDTO $dto): Staff
    {
        $branchUser->update($dto->toArray());
        return $branchUser;
    }

    public function delete(Staff $branchUser): int
    {
        return $branchUser->delete();
    }
}
