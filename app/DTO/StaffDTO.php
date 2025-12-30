<?php

namespace App\DTO;

use Illuminate\Http\Request;

class StaffDTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public int $branch_id,
        public ?int $user_id,
        public ?string $position,
    ){}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('name'),
            $request->input('email'),
            bcrypt($request->input('password')),
            $request->input('branch_id'),
            $request->input('user_id'),
            $request->input('position')
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
            'branch_id' => $this->branch_id,
            'user_id' => $this->user_id,
            'position' => $this->position,
        ];
    }
}
