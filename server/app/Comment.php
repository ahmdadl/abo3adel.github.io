<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $guarded = [];

    protected $appends = ['updated'];

    public function getUpdatedAttribute(): ?string
    {
        return $this->updated_at->format('d M Y');
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
