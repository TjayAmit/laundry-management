<?php

namespace App\Filament\Resources\Laundries\Pages;

use App\Filament\Resources\Laundries\LaundriesResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLaundries extends ListRecords
{
    protected static string $resource = LaundriesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
