<?php

namespace App\Contracts\Repository;

use App\Contracts\LaundryRepositoryInterface;
use App\Models\Laundry;

class LaundryRepository implements LaundryRepositoryInterface
{

    public function findMyLaundry(): ?Laundry
    {
        return Laundry::where('user_id', auth()->user()->id)->firstOrFail();
    }
}
