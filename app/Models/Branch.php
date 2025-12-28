<?php

namespace App\Models;

use App\Enums\CapacityStatusEnum;
use App\Enums\LaundryShopBranchStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    /** @use HasFactory<\Database\Factories\BranchFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'capacity_limit',
        'warning_threshold',
        'time_open',
        'time_close',
        'latitude',
        'longitude',
        'status',
        'laundry_id',
    ];

    protected $casts = [
        'status' => LaundryShopBranchStatus::class,
    ];

    public function laundry(): BelongsTo
    {
        return $this->BelongsTo(Laundry::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function getCapacityUsageAttribute(): ?float
    {
        if ($this->capacity_limit === 0) {
            return null;
        }

        return ($this->active_orders_count / $this->capacity_limit) * 100;
    }

    public function getCapacityStatusAttribute(): CapacityStatusEnum
    {
        if ($this->capacity_limit === 0) {
            return CapacityStatusEnum::NO_CAPACITY;
        }

        return match (true) {
            $this->active_orders_count === 0 =>
            CapacityStatusEnum::NO_ACTIVE_ORDERS,

            $this->capacity_usage >= 100 =>
            CapacityStatusEnum::CRITICAL,

            $this->capacity_usage >= $this->warning_threshold =>
            CapacityStatusEnum::WARNING,

            default =>
            CapacityStatusEnum::GOOD,
        };
    }
}
