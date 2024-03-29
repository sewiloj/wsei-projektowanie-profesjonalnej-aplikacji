<?php

namespace App\Http\Controllers;

use App\Models\PermissionRequest;
use App\Models\UserPermission;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
/**
 * @group Adminpanel
 *
 * Panel administratora
 */
class AdminController extends Controller
{
    /**
     * Wniosek o uprawnienia
     *
     * @response 404 scenario="Błąd" {"success": "fail"}
     * @response 201 scenario="Sukces" {"success": "success", "requests": [ {"id": 1, "user_id": 1, "permissions": 10, "message": "test", "accepted": "0", "name": "Adrian Kowalski"} ]}

     */

    public function requests()
    {
        try {
            $requests = PermissionRequest::with('user:id,name')->where('accepted', 0)->get();
            $requests = $requests->map(fn ($item) => [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'permission' => $item->permission,
                'message' => $item->message,
                'accepted' => $item->accepted,
                'name' => $item->user->name
            ]);

            return response()->json(['success' => 'success', 'requests' => $requests], 201);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['success' => 'fail'], 404);
        }
    }

    /**
     * Akceptuj wniosek
     *
     * @response 404 scenario="Błąd" {"success": "fail"}
     * @response 201 scenario="Sukces" {"success": "success"}
     *
     * @bodyParam is_accepted bool required
     * @bodyParam permission_id int required
     */
    public function handleRequest(Request $request)
    {
        $this->validate($request, [
            'is_accepted'    => 'required|boolean',
            'permission_id' => 'required|integer'
        ]);

        try {
            DB::transaction(function () use ($request) {
                $accepted = $request->input('is_accepted') ? 1 : 2;
                $permRequest = PermissionRequest::where('id', $request->input('permission_id'))->firstOrFail();
                $permRequest->accepted = $accepted;
                $permRequest->save();
                if ($request->input('is_accepted')) {
                    $userPermission = UserPermission::where('user_id', $permRequest->user_id)->firstOrFail();
                    $userPermission->permission = $permRequest->permission;
                    $userPermission->save();
                }
            });

            return response()->json(['success' => 'success'], 201);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['success' => 'fail'], 404);
        }
    }
}
