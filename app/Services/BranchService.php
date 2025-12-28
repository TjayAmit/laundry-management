<?php

namespace App\Services;

use App\Contracts\BranchRepositoryInterface;
use App\Contracts\LaundryRepositoryInterface;
use App\DTO\BranchDTO;
use App\Models\Branch;
use Illuminate\Http\Request;

class BranchService
{
    public function __construct(
        protected BranchRepositoryInterface $repository,
        protected LaundryRepositoryInterface $laundryRepository,
    ){}

    public function create(Request $request): Branch
    {
        $dto = BranchDTO::fromRequest($request);
        $dto->laundry_id = $this->laundryRepository->findMyLaundry()->id;

        return $this->repository->create($dto);
    }
}
