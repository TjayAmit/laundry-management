<?php

namespace App\Filament\Resources\Roles\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Spatie\Permission\Models\Permission;

class RoleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name'),
                TextInput::make('guard_name'),
                CheckboxList::make('permissions')
                    ->label('Permissions')
                    ->relationship(
                        name: 'permissions',
                        titleAttribute: 'name'
                    )
                    ->columns(3)
                    ->searchable(),
            ]);
    }
}
