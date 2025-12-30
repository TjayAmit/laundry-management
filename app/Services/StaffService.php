<?php

namespace App\Services;

use App\Contracts\StaffRepositoryInterface;
use App\DTO\StaffDTO;
use App\Models\Staff;;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class StaffService
{
    public function __construct(
        protected StaffRepositoryInterface $repository
    ){}

    public function getAll(Request $request): Collection
    {
        return $this->repository->getAll($request);
    }

    public function create(Request $request): Staff
    {
        $dto = StaffDTO::fromRequest($request);

        return $this->repository->create($dto);
    }

    public function update(Staff $branchUser, Request $request): Staff
    {
        $dto = StaffDTO::fromRequest($request);
        return $this->repository->update($branchUser, $dto);
    }

    public function delete(Staff $branchUser): int
    {
        return $this->repository->delete($branchUser);
    }
}
