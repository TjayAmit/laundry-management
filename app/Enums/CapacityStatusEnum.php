<?php

namespace App\Enums;

enum CapacityStatusEnum: string
{
    case NO_CAPACITY = 'no_capacity';
    case NO_ORDERS   = 'no_orders';
    case GOOD        = 'good';
    case WARNING     = 'warning';
    case CRITICAL    = 'critical';

    public function label(): string
    {
        return match ($this) {
            self::NO_CAPACITY => 'No Capacity',
            self::NO_ORDERS   => 'No Orders',
            self::GOOD        => 'Good',
            self::WARNING     => 'Near Maximum',
            self::CRITICAL    => 'Can’t Accept Orders',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::NO_CAPACITY,
            self::NO_ORDERS   => 'gray',
            self::GOOD        => 'success',
            self::WARNING     => 'warning',
            self::CRITICAL    => 'danger',
        };
    }
}
