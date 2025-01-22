<?php

namespace App\Http\Controllers;

use App\Http\Services\OpenAIService;
use App\Models\UserComic;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DalleController extends Controller
{
    protected OpenAIService $openAIService;

    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }

    public function generate(Request $request): JsonResponse
    {
        $story = $request->input('storySummary');
        $characterSetting = $request->input('characterSetting');
        $styleId = $request->input('styleId');

//        $result = $this->openAIService->generateImage(
//            $story, $charDescription, $comicStyleId
//        );
//
//        $client = new Client();
//        $response = $client->get($result['imageUrl']);
//        $imageContent = $response->getBody()->getContents();
//
//        $filename = 'comics/' . uniqid() . '.jpg';
//
//        Storage::disk('s3')->put($filename, $imageContent);
//
//        $url = Storage::disk('s3')->url($filename);

        $url = '123123';

        $userComic = UserComic::create([
            'story_summary' => $story,
            'character_setting' => $characterSetting,
            'style' => $styleId,
            'image_url' => $url,
        ]);

        return response()->json($userComic);
    }

    public function getUserComic(UserComic $userComic): JsonResponse
    {
//        $userComic->dialog = [
//            [
//                'id' => 1,
//                'x' => 100,
//                'y' => 100,
//                'width' => 200,
//                'height' => 100,
//                'text' => "Hello, this is a test dialog!"
//            ]
//        ];
//
//        $userComic->save();

        return response()->json($userComic);
    }

    public function updateComic(Request $request, UserComic $userComic): void
    {
        $dialog = $request->input('dialogs');

        $userComic->dialog = $dialog;
        $userComic->save();
    }

    public function getUserComics(): JsonResponse
    {
        return response()->json(UserComic::all());
    }
}

