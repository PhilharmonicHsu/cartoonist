<?php

namespace Tests\Feature;

use App\Models\UserComic;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('UserComic model has correct attributes', function () {
    $userComic = UserComic::create([
        'story_summary' => 'This is a test story.',
        'character_setting' => 'This is a test character.',
        'style' => 1,
        'image_url' => 'https://example.com/image.png',
        'dialogs' => [
            [
                "id" => 1,
                "x" => 635,
                "y" => 408,
                "width" => 200,
                "height" => 100,
                "text" => "Hello, this is a test dialog!"
            ],
        ]
    ]);

    expect($userComic->story_summary)->toBe('This is a test story.')
        ->and($userComic->character_setting)->toBe('This is a test character.')
        ->and($userComic->style)->toBe(1)
        ->and($userComic->image_url)->toBe('https://example.com/image.png')
        ->and($userComic->dialogs)->toBeArray()
        ->and($userComic->dialogs[0]['text'])->toBe('Hello, this is a test dialog!');
});

test('UserComic model can save to the database', function () {
    $userComic = UserComic::factory()->create([
        'story_summary' => 'Database test story.',
        'character_setting' => 'A mysterious figure.',
        'style' => 2,
        'image_url' => 'https://example.com/db-image.png',
        'dialogs' => [
            [
                "id" => 1,
                "x" => 635,
                "y" => 408,
                "width" => 200,
                "height" => 100,
                "text" => "Hello, this is a test dialog!"
            ],
        ],
    ]);

    $this->assertDatabaseHas('user_comic', [
        'id' => $userComic->id,
        'story_summary' => 'Database test story.',
        'character_setting' => 'A mysterious figure.',
        'style' => 2,
        'image_url' => 'https://example.com/db-image.png',
    ]);

    expect($userComic->dialogs)->toBeArray()
        ->and($userComic->dialogs[0]['text'])->toBe('Hello, this is a test dialog!');
});
