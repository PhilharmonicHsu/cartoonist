<?php

namespace Tests\Service;

use App\Http\Repositories\ComicRepository;
use App\Http\Services\ComicService;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\Storage;
use Mockery;
use GuzzleHttp\Client;

test('sendResultToAWS uploads image to S3 and returns URL', function () {
    $result = ['imageUrl' => 'https://example.com/image.jpg'];
    $mockImageContent = 'fakeImageContent';
    $mockS3Url = 'https://s3.amazonaws.com/bucket/comics/unique-id.jpg';

    // Mock GuzzleHttp\Client
    $mockClient = Mockery::mock(Client::class);
    $mockClient->shouldReceive('get')
        ->once()
        ->with($result['imageUrl'])
        ->andReturn(new Response(200, [], $mockImageContent));

    // Mock Storage
    Storage::fake('s3');
    Storage::shouldReceive('disk')
        ->with('s3')
        ->andReturnSelf();
    Storage::shouldReceive('put')
        ->once()
        ->with(Mockery::type('string'), $mockImageContent);
    Storage::shouldReceive('url')
        ->andReturn($mockS3Url);

    $service = new ComicService(new ComicRepository(), $mockClient);
    $response = $service->sendResultToAWS($result);

    expect($response)->toBe($mockS3Url);
});
