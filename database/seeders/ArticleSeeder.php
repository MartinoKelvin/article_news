<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::pluck('id')->toArray();

        for ($i = 1; $i <= 10; $i++) {
            Article::create([
                'user_id' => 1, // pastikan user dengan ID 1 sudah ada
                'category_id' => fake()->randomElement($categories),
                'title' => "Artikel Teknologi $i",
                'slug' => Str::slug("Artikel Teknologi $i") . '-' . uniqid(),
                'content' => "Ini adalah isi artikel teknologi ke-$i yang berisi informasi tren terkini dunia digital, AI, dan pengembangan web modern.",
                'thumbnail' => "thumbnails/artikel$i.jpg",
                'views' => rand(50, 500),
            ]);
        }
    }
}
