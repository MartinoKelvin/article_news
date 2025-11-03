<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Article;
use Illuminate\Support\Facades\Auth; // ✅ tambahkan ini


class CommentController extends Controller
{
    // helper: terima Article instance atau slug/id string, kembalikan Article model
    protected function resolveArticle($param): Article
    {
        if ($param instanceof Article) {
            return $param;
        }

        // jika param numeric => anggap id
        if (is_numeric($param)) {
            return Article::findOrFail($param);
        }

        // default: cari by slug
        return Article::where('slug', $param)->firstOrFail();
    }

    public function index($articleParam)
    {
        $article = $this->resolveArticle($articleParam);

        $comments = Comment::with('user')
            ->where('article_id', $article->id)
            ->latest()
            ->get();

        return response()->json($comments);
    }

    public function store(Request $request, $articleParam)
    {
        $article = $this->resolveArticle($articleParam);

        $request->validate([
            'content' => 'required|string|max:1000',
            'guest_name' => 'nullable|string|max:100',
            'captcha' => 'required|numeric',
        ]);

        // cek captcha dari session
        $sessionKey = "captcha_article_{$article->id}";
        $expected = session()->get($sessionKey);

        if ($expected === null || (int)$request->captcha !== (int)$expected) {
            return response()->json(['message' => 'Captcha salah'], 422);
        }

        $comment = Comment::create([
            'article_id' => $article->id,
            // gunakan facade Auth:: agar Intelephense tidak menandai error
            'user_id' => Auth::check() ? Auth::id() : null,
            'guest_name' => $request->guest_name ?? 'Anonymous',
            'content' => $request->content,
        ]);

        // hapus captcha agar tidak bisa dipakai ulang
        session()->forget($sessionKey);

        return response()->json($comment->load('user'), 201);
    }

    public function destroy(Comment $comment)
    {
        if (Auth::check()) {
            if ($comment->user_id !== Auth::id() && !Auth::user()->isAdmin) {
                return response()->json(['message' => 'Tidak diizinkan'], 403);
            }
            $comment->delete();
            return response()->json(['message' => 'Komentar dihapus']);
        }

        return response()->json(['message' => 'Harus login untuk menghapus komentar'], 401);
    }
}
