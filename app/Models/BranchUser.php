<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BranchUser extends Model
{
    /** @use HasFactory<\Database\Factories\BranchUserFactory> */
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'user_id',
        'position',
        'assigned_at',
        'is_primary',
    ];

    public $timestamps = false;

    protected $casts = [
        'assigned_at' => 'datetime',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
