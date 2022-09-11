<?php

use App\Models\Movie;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function Termwind\render;

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
    $movies = Movie::with(['favourites' => function ($query) {
        if (Auth::check()) {
            return $query->where('user_id', Auth::user()->id);
        }
    }])->withCount('favourites')->where('published', true);

    return Inertia::render('Home', [
        'movies' => $movies->orderBy('created_at', 'desc')->get()
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get("/unauthorized", function () {
    return Inertia::render('Unauthorized');
});

require __DIR__ . '/auth.php';
