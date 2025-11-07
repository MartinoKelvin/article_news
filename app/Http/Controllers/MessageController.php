<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    // Simpan pesan dari form
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $message = \App\Models\Message::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim!',
            'data' => $message,
        ], 201);
    }


    // Tampilkan daftar pesan di dashboard admin
    public function index()
    {
        $messages = Message::latest()->paginate(10);

        return Inertia::render('Dashboard/Message', [
            'messages' => $messages
        ]);
    }

    // Hapus pesan
    public function destroy(Message $message)
    {
        $message->delete();
        return back()->with('success', 'Pesan berhasil dihapus!');
    }
}
