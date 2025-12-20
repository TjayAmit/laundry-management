<?php

namespace App\Enums;

enum PaymentMethodEnum: string
{
    case CASH = 'cash';
    case GCASH = 'gcash';
    case MAYA = 'maya';
    case CARD = 'card';

    public function label(): string
    {
        return match ($this) {
            self::CASH => 'Cash',
            self::GCASH => 'GCash',
            self::MAYA => 'Maya',
            self::CARD => 'Card',
        };
    }
}
