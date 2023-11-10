<?php

namespace App\Listeners;

use App\Events\GameState;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\UpdateScore;
class SentImage
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UpdateScore $event): void
    {
        $user = $event->user;
        error_log('Players listener handled event for user: ' . $user->id);
    }
}
