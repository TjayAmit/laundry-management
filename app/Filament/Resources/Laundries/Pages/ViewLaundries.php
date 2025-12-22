<?php

namespace App\Filament\Resources\Laundries\Pages;

use App\Filament\Resources\Laundries\LaundriesResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewLaundries extends ViewRecord
{
    protected static string $resource = LaundriesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
