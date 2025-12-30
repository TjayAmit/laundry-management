<?php

namespace App\Services;

use App\Contracts\BranchUserRepositoryInterface;
use App\DTO\BranchUserDTO;
use App\Models\BranchUser;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class BranchUserService
{
    public function __construct(
        protected BranchUserRepositoryInterface $repository
    ){}

    public function getAll(Request $request): Collection
    {
        return $this->repository->getAll($request);
    }

    public function create(Request $request): BranchUser
    {
        $dto = BranchUserDTO::fromRequest($request);

        return $this->repository->create($dto);
    }

    public function update(BranchUser $branchUser, Request $request): BranchUser
    {
        $dto = BranchUserDTO::fromRequest($request);
        return $this->repository->update($branchUser, $dto);
    }

    public function delete(BranchUser $branchUser): int
    {
        return $this->repository->delete($branchUser);
    }
}
