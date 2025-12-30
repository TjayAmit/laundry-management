<?php

namespace App\Services;

use App\Contracts\BranchRepositoryInterface;
use App\Contracts\LaundryRepositoryInterface;
use App\DTO\BranchDTO;
use App\Models\Branch;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BranchService
{
    public function __construct(
        protected BranchRepositoryInterface $repository,
        protected LaundryRepositoryInterface $laundryRepository,
    ){}

    public function get(Request $request): Collection
    {
        return $this->repository->all($request);
    }

    public function create(Request $request): Branch
    {
        Log::info(json_encode($this->laundryRepository->findMyLaundry(), JSON_PRETTY_PRINT));
        $dto = BranchDTO::fromRequest($request);
        $dto->laundry_id = $this->laundryRepository->findMyLaundry()->id;

        return $this->repository->create($dto);
    }
}
