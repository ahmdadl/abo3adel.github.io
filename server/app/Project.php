<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guard = [];

    protected $casts = [
        'img' => 'array',
        'tags' => 'array'
    ];
}
