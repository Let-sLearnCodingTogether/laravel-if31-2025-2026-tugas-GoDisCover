<?php

use App\Http\Controllers\Auth\AuthenController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function(){
    Route::post('/register',[AuthenController::class,'register']);
    Route::post('/login',[AuthenController::class,'login']);
});
Route::post('/logout',function(Request $request){
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('/task',TaskController::class)->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
