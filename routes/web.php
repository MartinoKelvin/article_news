<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Article;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;

Route::get('/articles/{article}/comments', [CommentController::class, 'index']);
Route::post('/articles/{article}/comments', [CommentController::class, 'store']);
Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);

Route::middleware(['auth', 'isAdmin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
});

Route::get('/', function () {
    // ambil artikel terbaru (eager load user), batasi mis. 6 item
    $articles = Article::with('user')->latest()->take(6)->get();

    return Inertia::render('welcome', [
        'articles' => $articles,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::get('/articles/{slug}', [ArticleController::class, 'show'])->name('articles.show');

Route::get('/artikel', function () {
    $articles = Article::with('user')
        ->latest()
        ->get();

    return Inertia::render('artikel/index', [
        'articles' => $articles,
    ]);
})->name('artikel');

Route::get('/contact', function () {
    return Inertia::render('ContactPage/ContactPage');
})->name('contact');

Route::get('/tentangkami', function () {
    return Inertia::render('tentang-kami/index');
})->name('tentangkami');

Route::middleware(['auth'])->group(function () {
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::post('/articles', [ArticleController::class, 'store']);

    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);
});
Route::middleware(['auth', 'isAdmin'])->group(function () {
    Route::get('/dashboard/articles', function () {
        return Inertia::render('Dashboard/ArticleManagement');
    })->name('dashboard.articles');
    Route::get('/dashboard/articles/stats', function () {
        $articles = \App\Models\Article::all();
        return response()->json([
            'total_articles' => $articles->count(),
            'total_views' => $articles->sum('views'),
            'today_articles' => $articles
                ->where('created_at', '>=', now()->startOfDay())
                ->count(),
        ]);
    });
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
