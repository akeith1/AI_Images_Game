<?

namespace Tests\Feature;

use Tests\TestCase;
use App\Events\GameState;
use Illuminate\Support\Facades\Event;

class YourTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        Event::fake();

        // The action that triggers the event...
        $user = GameState::dispatch(); // Get a user instance from your database
        event(new GameState($user)); // Dispatch your event with relevant data
    
        Event::assertDispatched(GameState::class, function ($e) use ($user) {
            return $e->user->id === $user->id;
        });
    }
}

