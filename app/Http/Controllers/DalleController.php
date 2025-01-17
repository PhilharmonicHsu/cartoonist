<?php

namespace App\Http\Controllers;

use App\Http\Services\OpenAIService;
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
        $story = $request->input('story');
        $charDescription = $request->input('charDescription');
        $comicStyleId = $request->input('comicStyleId');
        [$isSuccessful, $imageUrl] = $this->openAIService->generateImage($story, $charDescription, $comicStyleId);

        $client = new Client();
        $response = $client->get($imageUrl);
        $imageContent = $response->getBody()->getContents();

        $filename = 'comics/' . uniqid() . '.jpg';

        Storage::disk('s3')->put($filename, $imageContent);

        $url = Storage::disk('s3')->url($filename);

        return response()->json($response);
    }

    function testDownImage()
    {
        $client = new Client();
        $response = $client->get('https://mcphils.s3.us-east-2.amazonaws.com/images/CdTUhjSKQpwQEwLeHDx70I6Ty2JUrgIxceEehGZG.jpg');
        $imageContent = $response->getBody()->getContents();

        $filename = 'images/' . uniqid('image_') . '.jpg';

        Storage::disk('s3')->put($filename, $imageContent);

        $url = Storage::disk('s3')->url($filename);

        dd($url);
    }
}

