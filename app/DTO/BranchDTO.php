<?php

namespace App\DTO;

use Illuminate\Http\Request;

class BranchDTO
{
    public function __construct(
        public string $name,
        public ?int $laundry_id,
        public string $address,
        public string $status,
        public string $capacity_limit,
        public string $warning_threshold,
        public string $time_open,
        public string $time_close,
        public ?float $latitude,
        public ?float $longitude
    ){}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->name,
            $request->laundry_id,
            $request->address,
            $request->status,
            $request->capacity_limit,
            $request->warning_threshold,
            $request->time_open,
            $request->time_close,
            $request->latitude,
            $request->longitude
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'laundry_id' => $this->laundry_id,
            'address' => $this->address,
            'status' => $this->status,
            'capacity_limit' => $this->capacity_limit,
            'warning_threshold' => $this->warning_threshold,
            'time_open' => $this->time_open,
            'time_close' => $this->time_close,
            'latitude' => $this->latitude,
        ];
    }
}
