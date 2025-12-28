<?php

namespace App\Contracts;

use App\DTO\BranchDTO;
use App\Models\Branch;
use Illuminate\Database\Eloquent\Collection;

interface BranchRepositoryInterface
{
    public function all(): Collection;
    public function create(BranchDTO $dto): Branch;
}
