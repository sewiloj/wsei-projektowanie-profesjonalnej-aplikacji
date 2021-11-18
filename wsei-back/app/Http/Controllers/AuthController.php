<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPermission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
/**
 * @group Autentykacja
 *
 * Endpointy do rejestracji i logowania
 */
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

    /**
     * Rejestracja
     * @unauthenticated
     * Rejestracja nowego użytkownika
     *
     * @response 409 scenario="Błąd" {"success": "fail"}
     * @response 201 scenario="Użytkownik pomyślnie założony" {"success": "success", "user": {"name": "Adrian Kowalski", "email": "adrian.kowalski@gmail.com", "updated_at": "2021-11-18T10:12:03.000000Z", "created_at": "2021-11-18T10:12:03.000000Z", "id": 4}}
     *
     * @bodyParam name string required Nazwa użytkownika. Example: Adrian Kowalski
     * @bodyParam email string required Email użytkownika. Example: adrian.kowalski@gmail.com
     * @bodyParam password string required Hasło użytkownika. Example: password
     * @bodyParam password_confirmation string required Powtórz hasło użytkownika. Example: password
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed'
        ]);

        try {
            $user = new User();
            DB::transaction(function () use ($request, $user) {
                $user->name = $request->input('name');
                $user->email = $request->input('email');
                $user->password = Hash::make($request->input('password'));
                $user->save();

                $permission = new UserPermission();
                $permission->permission = config('permissions.None');
                $permission->user_id = $user->id;
                $permission->save();
            });

            return response()->json(['success' => 'success', 'user' => $user], 201);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['success' => 'fail'], 409);
        }
    }

    /**
     * Logowanie
     * @unauthenticated
     *
     * @response 401 scenario="Błąd" {"success": "fail"}
     * @response 201 scenario="Użytkownik pomyślnie zalogowany" {"success": "success","api_token": "API_TOKEN","name": "Adrian Kowalski","permission": "1"}
     *
     * @bodyParam email string required Email użytkownika. Example: adrian.kowalski@gmail.com
     * @bodyParam password string required Hasło użytkownika. Example: password
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required',
            'password' => 'required'
        ]);


        $user = User::where('email', $request->input('email'))->with('permission')->first();

        if($user && Hash::check($request->input('password'), $user->password))
        {
                $apitoken = Crypt::encrypt((Str::random(32)));
                User::where('email', $request->input('email'))->update(['api_token' => $apitoken]);

                return response()->json(['success' => 'success', 'api_token' => $apitoken, 'name' => $user->name, 'permission' => $user->permission->permission], 201);

        }else {
            return response()->json(['success' => 'fail'], 401);
        }
    }

    /**
     * Wylogowanie
     * @unauthenticated
     *
     * @response 403 scenario="Błąd" {"success": "fail"}
     * @response 201 scenario="Pomyślnie wylogowano" {"success": "success"}
     *
     */
    public function logout(Request $request)
    {
        if ($request->header('api_token')) {
            try {
                User::where('api_token', $request->header('api_token'))->update(['api_token' => null]);
            } catch (\Exception $e) {
                Log::error($e);
                return response()->json(['success' => 'fail'], 403);
            }
        }
        return response()->json(['success' => 'success'], 201);
    }
}
