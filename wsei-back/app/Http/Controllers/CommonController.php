<?php

namespace App\Http\Controllers;

use App\Models\VaccineStock;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use OutOfRangeException;

class CommonController extends Controller
{
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function transfer(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|integer',
            'count' => 'required|integer'
        ]);

        $user = $this->userRepository->getByToken($request->header('api_token'));

        try {
            DB::transaction(function () use ($request, $user) {
                $stock = VaccineStock::where('user_id', $user->id)->firstOrFail();

                if ($stock->stock < $request->input('count')) {
                    throw new OutOfRangeException("Out of stock");
                }

                $stock->stock -= $request->input('count');
                $stock->save();

                $toStock = VaccineStock::where('user_id', $request->input('user_id'))->first();

                if (!$toStock) {
                    $toStock = new VaccineStock();
                    $toStock->user_id = $request->input('user_id');
                    $toStock->stock = $request->input('count');
                    $toStock->save();
                } else {
                    $toStock->stock += $request->input('count');
                    $toStock->save();
                }
            });

            return response()->json(['success' => 'success'], 201);
        } catch (OutOfRangeException $e) {
            return response()->json(['success' => 'fail'], 409);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['success' => 'fail'], 404);
        }
    }
}
