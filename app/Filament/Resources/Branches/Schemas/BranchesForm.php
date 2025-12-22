<?php

namespace App\Filament\Resources\Branches\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class BranchesForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name'),
                TextInput::make('address'),
                TextInput::make('capacity_limit'),
                TextInput::make('warning_threshold'),
                Select::make('laundry_id')
                    ->label('Laundry Shop')
                    ->relationship('laundry', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
            ]);
    }
}
