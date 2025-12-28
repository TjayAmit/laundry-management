<?php

namespace App\Contracts;

use App\DTO\BranchDTO;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

interface BranchRepositoryInterface
{
    public function all(Request $request): Collection;
    public function create(BranchDTO $dto): Branch;
}
