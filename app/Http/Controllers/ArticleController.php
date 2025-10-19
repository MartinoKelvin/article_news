<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    // list semua artikel
    public function index()
    {
        $articles = Article::latest()->paginate(10);
        return response()->json($articles);
    }

    // buat artikel baru
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'thumbnail' => 'nullable|string',
        ]);

        $article = Article::create([
            'user_id' => $request->user()->id, // ✅ pakai property
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'content' => $request->content,
            'thumbnail' => $request->thumbnail,
            'views' => 0,
        ]);

        return response()->json($article, 201);
    }


    // tampilkan 1 artikel
    public function show(Article $article)
    {
        return response()->json($article);
    }

    // update artikel
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
        ]);

        $article->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'content' => $request->content,
            'thumbnail' => $request->thumbnail,
        ]);

        return response()->json($article);
    }

    // hapus artikel
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article deleted']);
    }
}
