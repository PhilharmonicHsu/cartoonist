<?php

namespace Tests\Feature;

use App\Enums\ComicStyle;
use App\Http\Services\ComicService;
use App\Http\Services\OpenAIService;
use App\Models\UserComic;

test("test generate image is successfully", function() {
    $payload = [
        'storySummary' => 'a post-apocalyptic city with destroyed buildings and scattered debris',
        'characterSetting' => 'a brave hero wearing a shining armor',
        'styleId' => ComicStyle::JAPANESE->value
    ];

    $fakerUserComic = UserComic::factory()->create([
        'story_summary' => $payload['storySummary'],
        'character_setting' => $payload['characterSetting'],
        'style' => $payload['styleId'],
    ]);

    $this->mock(OpenAIService::class, function ($mock) {
        $mock->shouldReceive('generateImage')
            ->once()
            ->andReturn([
                'isSuccessful' => true,
                'imageUrl' => 'https://example.com/image-from-open-ai.jpg'
            ]);
    });

    $this->mock(ComicService::class, function ($mock) use ($fakerUserComic) {
        $mock->shouldReceive('sendResultToAWS')
            ->once()
            ->andReturn([
                'isSuccess' => true,
                'url' => 'https://s3.amazonaws.com/bucket/comics/unique-id.jpg'
            ]);

        $mock->shouldReceive('createComic')
            ->once()
            ->andReturn($fakerUserComic);
    });

    $response = $this->postJson('/api/generate-image', $payload);

    expect($response->status())->toBe(200)
        ->and($response->json())->toMatchArray([
            'id' => $fakerUserComic->id,
            'story_summary' => $fakerUserComic->story_summary,
            'character_setting' => $fakerUserComic->character_setting,
            'image_url' => $fakerUserComic->image_url,
            'dialogs' => [
                [
                    "id" => 1,
                    "x" => 100,
                    "y" => 100,
                    "width" => 200,
                    "height" => 100,
                    "text" => $fakerUserComic->dialogs[0]['text']
                ]
            ]
        ]);
});

test('fetch user comics that order by id desc', function () {
    $firstComic = UserComic::factory()->create();
    $secondComic = UserComic::factory()->create();
    $thirdComic = UserComic::factory()->create();

    $response = $this->getJson('/api/user-comics');
    $responseData = $response->json();

    expect($responseData[0]['story_summary'])->toBe($thirdComic->story_summary)
        ->and($responseData[1]['story_summary'])->toBe($secondComic->story_summary)
        ->and($responseData[2]['story_summary'])->toBe($firstComic->story_summary);
});

test('fetch user comic by id successfully', function () {
    $comic = UserComic::factory()->create();
    $response = $this->getJson("api/user-comic/{$comic->id}");
    $responseData = $response->json();

    expect($responseData['id'])->toBe($comic->id)
        ->and($responseData['story_summary'])->toBe($comic->story_summary)
        ->and($responseData['character_setting'])->toBe($comic->character_setting)
        ->and($responseData['style'])->toBe($comic->style);
});

test('update user comic successfully', function () {
   $comic = UserComic::factory()->create();
   $payload = [
       'dialogs' => [
           [
               'id' => 1,
               'x' => 100,
               'y' => 99,
               'width' => 570,
               'height' => 119,
               'text' => "this is updated text"
           ]
       ]
   ];

    $response = $this->patchJson("api/user-comic/{$comic->id}", $payload);
    $responseData = $response->json();

   expect($responseData['dialogs'][0])->toMatchArray($payload['dialogs'][0]);
});
