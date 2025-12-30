<?php

namespace App\Http\Controllers;

use App\Models\BranchUser;
use App\Services\BranchUserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchUserController extends Controller
{
    public function __construct(
        protected BranchUserService $service
    ){}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('branch-users/index', [
            'staffs' => $this->service->getAll($request)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = $this->service->create($request);

        return redirect()->route('branch-users.index', $result);
    }

    /**
     * Display the specified resource.
     */
    public function show(BranchUser $branchUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BranchUser $branchUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BranchUser $branchUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BranchUser $branchUser)
    {
        //
    }
}
