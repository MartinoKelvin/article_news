<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //


    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content',
        'thumbnail',
        'views',
    ];

    // relasi: artikel dimiliki oleh user (penulis/admin)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
