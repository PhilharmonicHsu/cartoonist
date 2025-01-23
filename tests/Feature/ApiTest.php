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
            ->andReturn('https://s3.amazonaws.com/bucket/comics/unique-id.jpg');

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
