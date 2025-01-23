<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateRequest;
use App\Http\Requests\UpdateComicRequest;
use App\Http\Services\ComicService;
use App\Http\Services\OpenAIService;
use App\Models\UserComic;
use Illuminate\Http\JsonResponse;

class ComicController extends Controller
{
    public function __construct(
        protected OpenAIService $openAIService,
        private readonly ComicService $comicService
    ) {}

    public function generate(GenerateRequest $request): JsonResponse
    {
        $data = $request->validated();

        $result = $this->openAIService->generateImage($data);

        $url = $this->comicService->sendResultToAWS($result);

        $data['imageUrl'] = $url;

        return response()->json($this->comicService->createComic($data));
    }

    public function getUserComic(UserComic $userComic): JsonResponse
    {
        return response()->json($userComic);
    }

    public function updateComic(UpdateComicRequest $request, UserComic $userComic): void
    {
        $this->comicService->updateComic($userComic, $request->validated());
    }

    public function getUserComics(): JsonResponse
    {
        return response()->json(
            $this->comicService->getUserComics()
        );
    }
}

