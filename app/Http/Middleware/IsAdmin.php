<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class IsAdmin
{


    public function handle(Request $request, Closure $next): Response
    {
        // cek user sudah login dan role = admin
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        // kalau bukan admin → tolak akses
        abort(403, 'Unauthorized access.');
     
    }
}
