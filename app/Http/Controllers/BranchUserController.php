<?php

namespace App\Http\Controllers;

use App\Contracts\BranchRepositoryInterface;
use App\Models\Staff;
use App\Services\BranchService;
use App\Services\StaffService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchUserController extends Controller
{
    public function __construct(
        protected StaffService $service,
        protected BranchRepositoryInterface $branchRepository
    ){}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('staffs/index', [
            'staffs' => $this->service->getAll($request)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('staffs/create', [
            'branches' => $this->branchRepository->selection($request)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = $this->service->create($request);

        return redirect()->route('staffs.index', $result);
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $branchUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $branchUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Staff $branchUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $branchUser)
    {
        //
    }
}
