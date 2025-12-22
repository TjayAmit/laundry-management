<?php

namespace App\Filament\Resources\Branches\Tables;

use App\Enums\CapacityStatusEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BranchesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID'),
                TextColumn::make('name')->label('Name'),
                TextColumn::make('address')->label('Address'),
                TextColumn::make('capacity_limit')->label('Capacity Limit'),
                TextColumn::make('warning_threshold')->label('Threshold'),
                TextColumn::make('active_orders_count')
                    ->label('Orders')
                    ->sortable()
                    ->alignCenter(),
                TextColumn::make('capacity_status')
                    ->badge()
                    ->formatStateUsing(fn (CapacityStatusEnum $state) => $state->label())
                    ->color(fn (CapacityStatusEnum $state) => $state->color())

            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
