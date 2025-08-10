<?php

use App\Enums\IntervalEnum;
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
        Schema::create('plan_subscription_features', function (Blueprint $table) {
            $table->id();

            $table->foreignId('subscription_id')->constrained('subscriptions')->onDelete('cascade');
            $table->foreignId('plan_feature_id')->constrained('plan_features')->onDelete('cascade');

            $table->string('value')->default('0');
            $table->boolean('active')->default(true);

            $table->unsignedInteger('reset_interval')->default(0);
            $table->enum('reset_period', array_column(IntervalEnum::cases(), 'value'))
                ->default(IntervalEnum::MONTH->value);
            $table->timestamp('reset_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_subscription_features');
    }
};
