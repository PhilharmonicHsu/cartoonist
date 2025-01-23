<?php

namespace App\Http\Repositories;

use App\Models\UserComic;
use Illuminate\Support\Collection;

class ComicRepository
{
    public function createComic(array $data): UserComic
    {
        return UserComic::create([
            'story_summary' => $data['storySummary'],
            'character_setting' => $data['characterSetting'],
            'style' => $data['styleId'],
            'image_url' => $data['imageUrl'],
        ]);
    }

    public function updateComic(UserComic $userComic, array $updateData): UserComic
    {
        $userComic->dialogs = $updateData['dialogs'];
        $userComic->save();

        return $userComic;
    }

    public function getUserComics(): Collection
    {
        return UserComic::orderByDesc('id')->get();
    }
}
