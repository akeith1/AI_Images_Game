<?php

use App\Http\Controllers\ProfileController;
use App\Events\GameState;
use App\Http\Controllers\GameController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');

})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/scoreboard', function() {
    return Inertia::render('Scoreboard');
})->name('scoreboard');

Route::get('/highscore', [GameController::class, 'highscores']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/game', function() {
        return Inertia::render('Game');
    })->name('multi-player');

    Route::post('/game', [GameController::class, '__invoke']);
    Route::post('/check', [GameController::class, 'updateScore']);
});

Route::middleware('auth')->group(function () {
    Route::get('/solo-game', function() {
        return Inertia::render('SingleGame');
    })->name('single-player');

    Route::post('/solo-game', [GameController::class, 'getImage']);
    Route::post('/save-database', [GameController::class,'updateDatabase']);
});

require __DIR__.'/auth.php';
