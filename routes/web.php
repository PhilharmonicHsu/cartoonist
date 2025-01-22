<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\UserComic;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/author-input', function () {
    return Inertia::render('AuthorInput');
});

Route::get('/comic-editor/{userComic:id}', function (UserComic $userComic) {
    return Inertia::render('ComicEditor', [
        'userComic' => $userComic
    ]);
});

Route::get('/comic-showroom/{userComic:id}', function (UserComic $userComic) {
    return Inertia::render('ComicShowRoom', [
        'userComic' => $userComic
    ]);
});

Route::get('/', function () {
   return Inertia::render('Library');
});

require __DIR__.'/auth.php';
