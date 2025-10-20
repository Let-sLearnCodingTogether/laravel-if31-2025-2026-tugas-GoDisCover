<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use app\Models\User;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            $task = Task::where('user_id', $request->user()->id)->get();
                return Response::json([
                    'message' => 'List Berhasil',
                    'data' => $task
                ], 200);
        } catch (Exception $e) {
            return Response::json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        try {
            $validatedData = $request->safe()->all();
            $validatedData['user_id'] = $request->user()->id;
            $task = Task::create($validatedData);
            return response()->json([
                'message' => 'Quote berhasil dibuat',
                'data' => $task
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        try {
            if($task->user_id == Auth::id()){  
                return Response::json([
                    'message' => 'List Berhasil',
                    'data' => $task 
                ], 200);
            }else{
                return Response::json([
                    'message' => 'User Tidak Membuat task tersebut',
                    'data' => null
                ],401);
            }

        } catch (Exception $e) {
            return Response::json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        try {
            if($task->user_id == Auth::id()){
            $validatedData = $request->safe()->all();
            $validatedData['user_id'] = $request->user()->id;
            $task = Task::create($validatedData);
            return response()->json([
                'message' => 'Quote berhasil diupdate',
                'data' => $task
            ], 201);
        }else{
                return Response::json([
                    'message' => 'User Tidak Membuat task tersebut',
                    'data' => null
                ],401);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        
    }
}
