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
        Schema::create('user_comic', function (Blueprint $table) {
            $table->id();
            $table->text('story_summary')->nullable();
            $table->text('character_setting')->nullable();
            $table->tinyInteger('style')->nullable(false);
            $table->text('image_url')->nullable(false);
            $table->json('dialog')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_comic');
    }
};
