<?php

namespace App\Enums;

enum LaundryShopBranchStatus: string
{
    case OPEN = 'open';
    case CLOSED = 'closed';
    case SUSPENDED = 'suspended';
    case UNDER_MAINTENANCE = 'under_maintenance';

    public function label(): string
    {
        return match ($this) {
            self::OPEN => 'Open',
            self::CLOSED => 'Closed',
            self::SUSPENDED => 'Suspended',
            self::UNDER_MAINTENANCE => 'Under Maintenance',
        };
    }
}
