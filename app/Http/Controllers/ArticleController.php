<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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
            // accept file upload
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            // store in storage/app/public/thumbnails
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
        } elseif ($request->filled('thumbnail')) {
            // fallback if frontend sends a path/url
            $thumbnailPath = $request->thumbnail;
        }

        $article = Article::create([
            'user_id' => $request->user()->id, // use property
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'content' => $request->content,
            'thumbnail' => $thumbnailPath,
            'views' => 0,
        ]);

        return response()->json([
            'id' => $article->id,
            'title' => $article->title,
            'slug' => $article->slug,
            'content' => $article->content,
            'thumbnail' => $thumbnailPath ? asset('storage/' . $thumbnailPath) : null,
            'views' => $article->views,
            'created_at' => $article->created_at,
        ], 201);
    }


    // tampilkan 1 artikel
    public function show($slug)
    {
        $article = Article::with('user')->where('slug', $slug)->firstOrFail();

        return Inertia::render('artikel/[id]/index', [
            'article' => $article,
        ]);
    }


    // update artikel
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $thumbnailPath = $article->thumbnail;
        if ($request->hasFile('thumbnail')) {
            // optionally delete old file
            if ($thumbnailPath && Storage::disk('public')->exists($thumbnailPath)) {
                Storage::disk('public')->delete($thumbnailPath);
            }
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
        } elseif ($request->filled('thumbnail')) {
            $thumbnailPath = $request->thumbnail;
        }

        $article->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'content' => $request->content,
            'thumbnail' => $thumbnailPath,
        ]);

        return response()->json([
            'id' => $article->id,
            'title' => $article->title,
            'slug' => $article->slug,
            'content' => $article->content,
            'thumbnail' => $thumbnailPath ? asset('storage/' . $thumbnailPath) : null,
            'views' => $article->views,
            'created_at' => $article->created_at,
        ]);
    }

    // hapus artikel
    public function destroy(Article $article)
    {
        if ($article->thumbnail && Storage::disk('public')->exists($article->thumbnail)) {
            Storage::disk('public')->delete($article->thumbnail);
        }

        $article->delete();
        return response()->json(['message' => 'Article deleted']);
    }
}
