<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use App\Models\SupplyRequest;
use App\Models\UserPermission;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
/**
 * @group Pracownik szpitala
 *
 * Endpointy do rejestracji i logowania
 */
class HospitalController extends Controller
{
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Pobierz ilość pacjentów
     *
     * @response 201 scenario="Sukces" {"success": "success", "count": 10}
     *
     */
    public function patientsCount(Request $request)
    {
        $patients = Hospital::where('user_id', ($this->userRepository->getByToken($request->header('api_token'))->id))->first();
        return response()->json(['success' => 'success', 'count' => $patients ? $patients->patients : 0], 200);
    }
    /**
     * Zmień ilość pacjentów
     *
     * @response 201 scenario="Sukces" {"success": "success"}
     * @bodyParam count int required
     */
    public function changePatientsCount(Request $request)
    {
        $this->validate($request, [
            'count' => 'required|integer'
        ]);
        $patients = Hospital::where('user_id', ($this->userRepository->getByToken($request->header('api_token'))->id))->first();
        if (!$patients) {
            $patients = new Hospital();
            $patients->user_id = $this->userRepository->getByToken($request->header('api_token'))->id;
        }
        $patients->patients = $request->input('count');
        $patients->save();

        return response()->json(['success' => 'success'], 201);
    }
    /**
     * Złóż zapotrzebowanie na szczepionki
     *
     * @response 201 scenario="Sukces" {"success": "success"}
     * @bodyParam vaccine_count int required
     */
    public function requestSupply(Request $request)
    {
        $this->validate($request, [
            'vaccine_count' => 'required|integer'
        ]);

        $supRequest = new SupplyRequest();
        $supRequest->user_id = $this->userRepository->getByToken($request->header('api_token'))->id;

        $supRequest->count = $request->input('vaccine_count');
        $supRequest->save();

        return response()->json(['success' => 'success'], 201);
    }
    /**
     * Pobierz listę pracowników szpitali
     *
     * @response 201 scenario="Sukces" {"success": "success", "hospital_workers": [{"hospital_worker_id": 1, "name": "Szczepan Nowak"}]}
     */
    public function hostpialWorkers()
    {
        $workers = UserPermission::with('user:id,name')->where('permission', config('permissions.HospitalWorker'))->get()
            ->map(fn ($item) => [
                'hospital_worker_id' => $item->user->id,
                'name' => $item->user->name
            ]);
        return response()->json(['success' => 'success', 'hospital_workers' => $workers], 200);
    }
}
