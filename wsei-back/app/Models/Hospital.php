<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
