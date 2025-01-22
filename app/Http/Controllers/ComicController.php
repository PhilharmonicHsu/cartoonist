<?php

namespace App\Http\Controllers;

use App\Http\Services\OpenAIService;
use App\Models\UserComic;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ComicController extends Controller
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

        $result = $this->openAIService->generateImage(
            $story, $characterSetting, $styleId
        );
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

        sleep(5);

        $url = 'https://mcphils.s3.us-east-2.amazonaws.com/images/CdTUhjSKQpwQEwLeHDx70I6Ty2JUrgIxceEehGZG.jpg';


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

