<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;

class UserController extends ApiController
{
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->paginate(5);

        return $this->successResponse([
            'users' => UserResource::collection($users),
            'links' => UserResource::collection($users)->response()->getData()->links,
            'meta' => UserResource::collection($users)->response()->getData()->meta,
        ]);
    }

    public function show(User $user)
    {
        return $this->successResponse(new UserResource($user));
    }

    public function store(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'cellphone' => ['required', 'regex:/^(\+98|0)?9\d{9}$/','unique:users,cellphone'],
            'password' => 'required|string',
            'is_admin' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        DB::beginTransaction();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'cellphone' => $request->cellphone,
            'password' => Hash::make($request->password),
            'is_admin' => $request->boolean('is_admin')
        ]);

        DB::commit();

        return $this->successResponse(new UserResource($user), 200);
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'cellphone' => ['required', 'regex:/^(\+98|0)?9\d{9}$/','unique:users,cellphone,'.$user->id,],
            'password' => 'nullable|string',
            'is_admin' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        DB::beginTransaction();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'cellphone' => $request->cellphone,
            'password' => $request->has('password') ? Hash::make($request->password) : $user->password,
            'is_admin' => $request->filled('is_admin') ? $request->boolean('is_admin') : $user->is_admin
        ]);

        DB::commit();

        return $this->successResponse(new UserResource($user), 200);
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return $this->errorResponse(['user' => ['شما نمی توانید حساب کاربری خودتان را حذف کنید']], 422);
        }

        if ($user->orders()->exists() || $user->transactions()->exists()) {
            return $this->errorResponse(['user' => ['این کاربر سابقه سفارش یا تراکنش دارد و قابل حذف نیست']], 422);
        }

        DB::beginTransaction();
        $user->delete();
        DB::commit();

        return $this->successResponse(new UserResource($user), 200);
    }

    public function addresses()
    {
        return $this->successResponse(Auth()->user()->addresses, 200);
    }
}
