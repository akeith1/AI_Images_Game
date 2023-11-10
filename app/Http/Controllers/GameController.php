<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\GameState;
use App\Events\UpdateScore;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
class GameController extends Controller
{

    public function __invoke(Request $request): JsonResponse
    {
        Log::info('GameController __invoke method was called');
        
        $input  = $request->input('input');
        error_log('GameState event fired for usersss: ' . $input);
        GameState::dispatch(Auth::user() ,$input);

        return response()->json(['success' => true]);
    }

    public function highscores(Request $request): JsonResponse
    {
        Log::info('GameController highscores method was called');

        $users = User::select('name', 'max_score')->get()->toJson();

        return response()->json($users);


    }

    public function updateDatabase(Request $request): JsonResponse
    {
        Log::info('GameController highscores method was called');
        $input = $request->input('input');
        $userId = Auth::user()->id;
        $user = User::find($userId);
        $curr_max_score = $user->max_score;
        if($curr_max_score < $input){
            $user->max_score = $input;
        }
       
        $user->save();
        
        return response()->json(['success' => true]);

    }
    public function getImage(Request $request): JsonResponse
    {
        $token = env('OPENAI_API_TOKEN');
        $url = 'https://api.openai.com/v1/images/generations';
        $input = $request->input('input');
        $client = new Client([
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer '.$token
            ]
        ]);
        
        $response = $client->request('POST', $url, [
            'json' => [
                'prompt' => $input, 
                'n' => 1,
                'size' => '1024x1024'
            ]
        ]);
        
        $data = json_decode($response->getBody(), true);
        $image = $data['data'][0]['url'];
        
        return response()->json($image);
    }


    public function updateScore(Request $request): JsonResponse
    {
        Log::info('GameController __update method was called');
        
        $correct  = $request->input('correct');
        $wrong = $request->input('wrong');
        $correctness = $request->input('correctness');

        UpdateScore::dispatch(Auth::user(), $correct, $wrong, $correctness);

        return response()->json(['success' => true]);


    }

}
