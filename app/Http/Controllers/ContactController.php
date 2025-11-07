<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'privacy' => 'accepted'
        ]);

        // Here you would typically:
        // 1. Send email notification
        // 2. Store in database
        // 3. Send auto-reply

        // For now, just return success
        return response()->json([
            'message' => 'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.'
        ]);
    }
}
