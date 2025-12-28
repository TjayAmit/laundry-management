<?php

namespace App\Traits;

use App\Http\Resources\BranchResource;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponse
{
    protected function apiResponse(callable $callback): mixed
    {
        return $this->errorResponse($callback);
    }

    private function successResponse(callable $callback): mixed
    {
        $caller = $this->getCaller();

        $class_name = $caller['class'] ?? null;
        $method = $caller['method'] ?? null;

        $result = $callback();

        return match ($class_name) {
            'BranchController' => match($method) {
                'index' => BranchResource::collection($result)->additional(['message' => 'Successfully retrieve branch list.'])->response(),
                default => response()->json(['data' => $result, 'message' => "{$class_name}::{$method} executed successfully."]),
            },
            default => response()->json(['data' => $result, 'message' => "{$class_name}::{$method} executed successfully."]),
        };
    }

    private function errorResponse(callable $callback): mixed
    {
        try {
            return $this->successResponse($callback);
        } catch (\Exception $e) {
            if (config('app.env') === 'local') {
                return response()->json([
                    'error' => [
                        'code' => 500,
                        'message' => $e->getMessage(),
                    ]
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return response()->json([
                'error' => [
                    'code' => 500,
                    'message' => 'An unexpected error occurred. Please try again later.'
                ]
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function getCaller(): array
    {
        $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 5);

        $full_controller_path = $trace[5]['class'] ?? null;

        return [
            'class' => class_basename($full_controller_path),
            'method' => $trace[4]['function'] ?? null,
        ];
    }
}
