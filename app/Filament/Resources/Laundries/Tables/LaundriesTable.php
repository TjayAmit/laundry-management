<?php

namespace App\Filament\Resources\Laundries\Tables;

use App\Enums\LaundryShopStatusEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LaundriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label("ID"),
                TextColumn::make('name')->label("Name"),
                TextColumn::make('email')->label("Email"),
                TextColumn::make('contact')->label("Contact")->default('None'),
                TextColumn::make('address')->label("Address"),
                TextColumn::make('branches_count')
                    ->label('Branches')
                    ->sortable()
                    ->alignCenter(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (LaundryShopStatusEnum $state) => $state->label())
                    ->color(fn (LaundryShopStatusEnum $state) => $state->color())
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
