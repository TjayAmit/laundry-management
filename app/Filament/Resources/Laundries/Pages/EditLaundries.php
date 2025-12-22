<?php

namespace App\Filament\Resources\Laundries\Pages;

use App\Filament\Resources\Laundries\LaundriesResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditLaundries extends EditRecord
{
    protected static string $resource = LaundriesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
