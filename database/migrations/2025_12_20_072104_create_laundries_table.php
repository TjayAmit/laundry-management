<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\LaundryShopStatusEnum;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laundries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('contact')->nullable();
            $table->text('address')->nullable();
            $table->enum('status', LaundryShopStatusEnum::cases())->default(LaundryShopStatusEnum::ACTIVE);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('laundries', function (Blueprint $table) {
            $table->dropForeign('laundries_user_id_foreign');
        });

        Schema::dropIfExists('laundries');
    }
};
