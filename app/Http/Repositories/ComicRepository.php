<?php

namespace App\Http\Repositories;

use App\Models\UserComic;
use Illuminate\Database\Eloquent\Collection;

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

    public function updateComic(UserComic $userComic, array $updateData): void
    {
        $userComic->dialogs = $updateData['dialogs'];
        $userComic->save();
    }

    public function getUserComics(): Collection
    {
        return UserComic::all();
    }
}
