<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Branch extends Model
{
    /** @use HasFactory<\Database\Factories\BranchFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'capacity_limit',
        'warning_threshold',
        'laundry_id',
    ];

    public function laundry(): BelongsTo
    {
        return $this->BelongsTo(Laundry::class);
    }
}
