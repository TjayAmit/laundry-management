<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\LaundryShopBranchStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('address')->nullable();
            $table->unsignedInteger('capacity_limit');
            $table->unsignedInteger('warning_threshold')->default(80);
            $table->string('time_open')->nullable();
            $table->string('time_close')->nullable();
            $table->float('latitude')->nullable();
            $table->float('longitude')->nullable();
            $table->enum('status', LaundryShopBranchStatus::cases())->default(LaundryShopBranchStatus::OPEN);
            $table->foreignId('laundry_id')->constrained('laundries');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
