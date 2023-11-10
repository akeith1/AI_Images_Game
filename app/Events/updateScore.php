<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class UpdateScore implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public User $user,public int $correct, public int $wrong ,public bool $correctness)
    {
        //
    }

    public function broadcastAs(): string
    {
        return 'update.score';
    }

    public function broadcastWith(): array
    {
        if ($this->correctness){
            return ['name' => $this->user->name,'correct' => $this->correct +1, 'wrong' => $this->wrong];   
        }

        return ['name' => $this->user->name,'correct' => $this->correct, 'wrong' => $this->wrong + 1];   
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $id =1;
        return [
            new PresenceChannel('game.'.$id),
        ];
    }
}
