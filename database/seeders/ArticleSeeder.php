<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 1; $i <= 5; $i++) {
            Article::create([
                'user_id' => 1, // pastikan ada user dengan ID 1 (admin)
                'title' => "Artikel Teknologi $i",
                'slug' => Str::slug("Artikel Teknologi $i") . '-' . uniqid(),
                'content' => "Ini adalah konten artikel teknologi ke-$i. Berisi informasi tentang tren terbaru di dunia teknologi.",
                'thumbnail' => "thumbnails/artikel$i.jpg",
                'views' => rand(10, 100), // random views
            ]);
        }
    }
}
