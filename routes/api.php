<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComicController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/generate-image', [ComicController::class, 'generate']);

Route::get('/user-comics', [ComicController::class, 'getUserComics']);

Route::get('/user-comic/{userComic:id}', [ComicController::class, 'getUserComic']);

Route::patch('/user-comic/{userComic:id}', [ComicController::class, 'updateComic']);
