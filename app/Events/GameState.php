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
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;

class GameState implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
   
    /**
     * Create a new event instance.
     */
    public function __construct(public User $user,public string $input)
    {
        
    }

    public function broadcastAs(): string
    {
        return 'message.sent';
    }

    public function broadcastWith(): array
    {
        $token = env('OPENAI_API_TOKEN');
        $url = 'https://api.openai.com/v1/images/generations';
        
        $client = new Client([
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer '.$token
            ]
        ]);
        
        $response = $client->request('POST', $url, [
            'json' => [
                'prompt' => $this->input, 
                'n' => 1,
                'size' => '1024x1024'
            ]
        ]);
        
        $data = json_decode($response->getBody(), true);
        $image = $data['data'][0]['url'];
        
        return ['image' => $image, 'input' => $this->input];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $id = 1;
        return [
            new PresenceChannel('game.'.$id),
        ];
    }
}
