<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderLog extends Model
{
    /** @use HasFactory<\Database\Factories\OrderLogFactory> */
    use HasFactory;

    protected $fillable = [
        'order_id',
        'status',
        'changed_by'
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
