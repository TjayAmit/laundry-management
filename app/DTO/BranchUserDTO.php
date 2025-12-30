<?php

namespace App\DTO;

use Illuminate\Http\Request;

class BranchUserDTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public int $branch_id,
        public string $position,
    ){}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('name'),
            $request->input('email'),
            $request->input('password'),
            $request->input('branch_id'),
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
            'position' => $this->position,
        ];
    }
}
