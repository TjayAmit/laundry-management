<?php

namespace App\Contracts;

use App\Models\Laundry;

interface LaundryRepositoryInterface
{
    public function findMyLaundry(): ?Laundry;

}
