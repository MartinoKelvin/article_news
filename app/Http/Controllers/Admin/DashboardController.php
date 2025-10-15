<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // bisa ambil data untuk dashboard, contoh jumlah user & artikel
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => \App\Models\User::count(),
                // 'articles' => \App\Models\Article::count(),
            ],
        ]);
    }
}
