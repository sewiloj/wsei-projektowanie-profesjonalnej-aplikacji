<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed'
        ]);

        try {
            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));

            $user->save();

            return response()->json(['success' => 'success', 'user' => $user], 201);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['success' => 'fail'], 409);
        }
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if (Hash::check($request->input('password'), $user->password)) {
            $apitoken = Crypt::encrypt((Str::random(32)));
            User::where('email', $request->input('email'))->update(['api_token' => $apitoken]);

            return response()->json(['success' => 'success', 'api_token' => $apitoken], 201);
        } else {
            return response()->json(['success' => 'fail'], 401);
        }
    }

    public function logout(Request $request)
    {
        if ($request->header('api_token')) {
            try {
                User::where('api_token', $request->header('api_token'))->update(['api_token' => null]);
            } catch (\Exception $e) {
                Log::error($e);
                return response()->json(['success' => 'fail'], 409);
            }
        }
        return response()->json(['success' => 'success'], 201);
    }
}
