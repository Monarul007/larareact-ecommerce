<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'status',
        'total_amount',
        'billing_name',
        'billing_email',
        'billing_address',
        'billing_city',
        'billing_country',
        'billing_postcode',
        'shipping_name',
        'shipping_address',
        'shipping_city',
        'shipping_country',
        'shipping_postcode',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}