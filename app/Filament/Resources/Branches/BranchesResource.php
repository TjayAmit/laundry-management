<?php

namespace App\Filament\Resources\Branches;

use App\Filament\Resources\Branches\Pages\CreateBranches;
use App\Filament\Resources\Branches\Pages\EditBranches;
use App\Filament\Resources\Branches\Pages\ListBranches;
use App\Filament\Resources\Branches\Schemas\BranchesForm;
use App\Filament\Resources\Branches\Tables\BranchesTable;
use App\Models\Branch;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use UnitEnum;

class BranchesResource extends Resource
{
    protected static ?string $model = Branch::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    protected static string | UnitEnum | null $navigationGroup = 'Laundry Management';

    protected static ?string $recordTitleAttribute = 'Branch';

    public static function form(Schema $schema): Schema
    {
        return BranchesForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BranchesTable::configure($table);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withCount([
                // Active orders (example: waiting only, or expand later)
                'orders as active_orders_count' => fn ($q) =>
                $q->whereIn('status', [
                    'received',
                ]),

                // Waiting orders
                'orders as waiting_orders_count' => fn ($q) =>
                $q->where('status', 'received'),

                // Washing orders
                'orders as washing_orders_count' => fn ($q) =>
                $q->where('status', 'washing'),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBranches::route('/'),
            'create' => CreateBranches::route('/create'),
            'edit' => EditBranches::route('/{record}/edit'),
        ];
    }
}
