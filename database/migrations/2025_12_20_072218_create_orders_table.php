<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();

            $table->enum('status', [
                'received',
                'washing',
                'drying',
                'folding',
                'ready',
                'claimed',
                'cancelled'
            ])->index();

            $table->decimal('total_amount', 10, 2)->default(0);

            // QR tracking
            $table->string('qr_code_payload')->unique();

            // Operational timestamps (fast reads, derived from logs)
            $table->timestamp('received_at')->nullable();
            $table->timestamp('ready_at')->nullable();
            $table->timestamp('claimed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
