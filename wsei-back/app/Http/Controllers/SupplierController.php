<?php

namespace App\Http\Controllers;

use App\Models\UserPermission;
use App\Models\VaccineStock;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
/**
 * @group Dostawca
 *
 */
class SupplierController extends Controller
{
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Dodaj szczepionki
     *
     * @response 404 scenario="Błąd" {"success": "fail"}
     * @response 201 scenario="Sukces" {"success": "success"}
     *
     * @bodyParam count int required
     */
    public function add(Request $request)
    {
        $this->validate($request, [
            'count' => 'required|integer'
        ]);

        $user = $this->userRepository->getByToken($request->header('api_token'));

        try {
            DB::transaction(function () use ($request, $user) {
                $stock = VaccineStock::where('user_id', $user->id)->first();
                if (!$stock) {
                    $stock = new VaccineStock();
                    $stock->user_id = $user->id;
                    $stock->stock = $request->input('count');
                    $stock->save();
                } else {
                    $stock->stock += $request->input('count');
                    $stock->save();
                }
            });

            return response()->json(['success' => 'success'], 201);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['success' => 'fail'], 404);
        }
    }

    /**
     * Pobierz ilość szczepionek
     *
     * @response 200 scenario="Sukces" {"success": "success", "stock": 105}
     *
     */
    public function getStock(Request $request)
    {
        $stock = VaccineStock::where('user_id', ($this->userRepository->getByToken($request->header('api_token'))->id))->first();
        return response()->json(['success' => 'success', 'stock' => $stock ?: 0], 200);
    }
}
