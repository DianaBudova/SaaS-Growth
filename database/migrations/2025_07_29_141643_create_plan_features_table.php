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
        Schema::create('plan_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_id')->constrained('plans')->onDelete('cascade');
            
            $table->string('name');
            $table->string('slug');
            $table->string('description')->nullable();
            $table->string('value')->default('0');
            $table->boolean('active')->default(true);

            $table->unsignedInteger('reset_interval')->default(0);
            $table->enum('reset_period', ['day', 'week', 'month', 'year'])->default('month');
            $table->timestamp('reset_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_features');
    }
};
