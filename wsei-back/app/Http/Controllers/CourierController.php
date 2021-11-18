<?php

namespace App\Http\Controllers;

use App\Models\UserPermission;
use App\Models\VaccineStock;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
/**
 * @group Kurier
 *
 */
class CourierController extends Controller
{
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Pobierz listę kurierów
     *
     * @response 201 scenario="Sukces" {"success": "success", "couriers": [{"courier_id": 1, "name": "DHL"}]}
     *
     */
    public function couriers()
    {
        $couriers = UserPermission::with('user:id,name')->where('permission', config('permissions.Courier'))->get()
            ->map(fn ($item) => [
                'courier_id' => $item->user->id,
                'name' => $item->user->name
            ]);
        return response()->json(['success' => 'success', 'couriers' => $couriers], 200);
    }
}
