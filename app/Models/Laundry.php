<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Laundry extends Model
{
    /** @use HasFactory<\Database\Factories\OwnerFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'contact',
        'address'
    ];

    public $timestamps = true;

    protected $casts = [
        'deleted_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
