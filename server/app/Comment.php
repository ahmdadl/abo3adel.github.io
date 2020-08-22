<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $guarded = [];

    protected $appends = [
        'updated',
        'gravatar',
    ];

    public function getUpdatedAttribute(): ?string
    {
        return $this->updated_at
            ->locale(app()->getLocale())
            ->translatedFormat('d M Y');
    }

    public function getGravatarAttribute(): ?string
    {
        return  'https://www.gravatar.com/avatar/' . md5(strtolower($this->user_mail)) . '.jpg?s=200&d=mm';
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
