<?php

namespace App\Http\Services;

use App\Http\Repositories\ComicRepository;
use App\Models\UserComic;
use GuzzleHttp\Client;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class ComicService
{
    public function __construct(
        private ComicRepository $comicRepository,
        private Client $client
    ) {}

    public function sendResultToAWS(array $result): string
    {
        $response = $this->client->get($result['imageUrl']);

        $imageContent = $response->getBody()->getContents();

        $filename = 'comics/' . uniqid() . '.jpg';

        Storage::disk('s3')->put($filename, $imageContent);

        return Storage::disk('s3')->url($filename);
    }

    public function createComic(array $data): UserComic
    {
        return $this->comicRepository->createComic($data);
    }

    public function updateComic(UserComic $userComic, array $data): void
    {
        $this->comicRepository->updateComic($userComic, $data);
    }

    public function getUserComics(): Collection
    {
        return $this->comicRepository->getUserComics();
    }
}
