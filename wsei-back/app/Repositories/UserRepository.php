<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function getByToken($token)
    {
        return User::where('api_token', $token)->firstOrFail();
    }
}
