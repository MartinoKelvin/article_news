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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id') // penulis/admin
                ->constrained('users')
                ->onDelete('cascade');
            $table->string('title'); // judul artikel
            $table->string('slug')->unique(); // slug untuk URL
            $table->text('content'); // isi artikel
            $table->string('thumbnail')->nullable(); // gambar cover
            $table->unsignedInteger('views')->default(0); // jumlah view
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
