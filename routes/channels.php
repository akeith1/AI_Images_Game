<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('user.{id}', function ($user, $id) {
    $color = '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
    $correct_guesses = 0;
    $wrong_guesses = 0;
    return (int) $user->id == (int) $id ? ['id' => $user->id, 'name' => $user->name, 'color' => $color, 'correct' => $correct_guesses, 'wrong' => $wrong_guesses] : false;
});


Broadcast::channel('game.{id}', function ($user, $id) {
    // Authorization logic to determine if the user can join the game
    $color = '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
    $correct_guesses = 0;
    $wrong_guesses = 0;
    return (int) 1 == (int) $id ? ['id' => $user->id, 'name' => $user->name, 'color' => $color, 'correct' => $correct_guesses, 'wrong' => $wrong_guesses] : false;

});
