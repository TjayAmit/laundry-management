<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->enum('payment_method', PaymentMethodEnum::cases())->default(PaymentMethodEnum::CASH);
            $table->string('reference_no')->nullable()->index();
            $table->decimal('amount', 10, 2);
            $table->enum('status', PaymentStatusEnum::cases())->default(PaymentStatusEnum::PENDING)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
