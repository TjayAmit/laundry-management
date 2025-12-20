<?php

namespace App\Enums;

enum OrderStatus: string
{
    case RECEIVED = 'received';
    case WASHING = 'washing';
    case DRYING = 'drying';
    case FOLDING = 'folding';
    case READY = 'ready';
    case CLAIMED = 'claimed';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::RECEIVED  => 'Received',
            self::WASHING   => 'Washing',
            self::DRYING    => 'Drying',
            self::FOLDING   => 'Folding',
            self::READY     => 'Ready for Pickup',
            self::CLAIMED   => 'Claimed',
            self::CANCELLED => 'Cancelled',
        };
    }
}
