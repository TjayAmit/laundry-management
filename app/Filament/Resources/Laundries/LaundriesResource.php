<?php

namespace App\Filament\Resources\Laundries;

use App\Filament\Resources\Laundries\Pages\CreateLaundries;
use App\Filament\Resources\Laundries\Pages\EditLaundries;
use App\Filament\Resources\Laundries\Pages\ListLaundries;
use App\Filament\Resources\Laundries\Pages\ViewLaundries;
use App\Filament\Resources\Laundries\Schemas\LaundriesForm;
use App\Filament\Resources\Laundries\Schemas\LaundriesInfolist;
use App\Filament\Resources\Laundries\Tables\LaundriesTable;
use App\Models\Laundry;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use UnitEnum;

class LaundriesResource extends Resource
{
    protected static ?string $model = Laundry::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    protected static string | UnitEnum | null $navigationGroup = 'Laundry Management';
    protected static ?string $recordTitleAttribute = 'Laundry';

    public static function form(Schema $schema): Schema
    {
        return LaundriesForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return LaundriesInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LaundriesTable::configure($table);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withCount('branches');
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
            'index' => ListLaundries::route('/'),
            'create' => CreateLaundries::route('/create'),
            'view' => ViewLaundries::route('/{record}'),
            'edit' => EditLaundries::route('/{record}/edit'),
        ];
    }
}
