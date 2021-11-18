<?php

namespace App\Http\Controllers;

use App\Models\PermissionRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Wniosek o uprawnienia
     *
     *
     * @response 404 scenario="Błąd" {"success": "fail"}
     * @response 201 scenario="Użytkownik pomyślnie założony" {"success": "success"}
     *
     * @bodyParam permission int required Example: 1
     * @bodyParam message string Opcjonalna wiadomość. Example: Wiadomość
     */

    public function requestPermission(Request $request)
    {
        $validated = $request->validate([
            'permission' => ['required', Rule::in(config('permissions'))],
            'message' => 'nullable|string'
        ]);

        try {
            $user = $this->userRepository->getByToken($request->header('api_token'));
            $permRequest = new PermissionRequest();
            $permRequest->user_id = $user->id;
            $permRequest->permission = $request->input('permission');
            $permRequest->message = $request->input('message');

            $permRequest->save();

            return response()->json(['success' => 'success'], 201);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['success' => 'fail'], 404);
        }
    }
}
