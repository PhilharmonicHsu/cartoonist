<?php

namespace App\Http\Services;

use App\Enums\ComicStyle;
use OpenAI;
use Exception;

class OpenAIService
{
    public function generateImage(string $story, string $charDescription, int $comicStyleId): array
    {
//        $story = 'a post-apocalyptic city with destroyed buildings and scattered debris';
//        $character = 'a brave hero wearing a shining armor';
//
//        $prompt = $this->generatePrompt($story, $character, '日系漫畫風');

        $prompt = $this->generatePrompt($story, $charDescription, $comicStyleId);

        try {
            $response = OpenAI::client(env('OPENAI_API_KEY'))
                ->images()
                ->create([
                    'model' => "dall-e-3",
                    'prompt' => $prompt,
                    'n'      => 1,
                    'size'   => '1024x1024',
                ]);

            $data = $response['data'][0];

            return [
                'isSuccessful' => true,
                'imageUrl' => $data['url']
            ];
        } catch (Exception $exception) {
            dd($exception->getMessage());

            return [
                'isSuccessful' => false,
                'imageUrl' => ''
            ];
        }
    }

    function generatePrompt($story, $character, $styleId): string
    {
        $promptStyle = ComicStyle::getStyleById($styleId);

        return "A $promptStyle. The setting is $story. The main character is $character. The art style features vibrant colors, bold lines, and dynamic shading.";
    }
}

