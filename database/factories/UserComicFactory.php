<?php

namespace Database\Factories;

use App\Enums\ComicStyle;
use App\Models\UserComic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserComic>
 */
class UserComicFactory extends Factory
{
    protected $model = UserComic::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'story_summary' => $this->faker->sentence(),
            'character_setting' => $this->faker->sentence(),
            'style' => $this->faker->randomElement(ComicStyle::getStyleIds()),
            'image_url' => $this->faker->imageUrl(),
            'dialogs' => [
                [
                    "id" => 1,
                    "x" => 100,
                    "y" => 100,
                    "width" => 200,
                    "height" => 100,
                    "text" => $this->faker->sentence(),
                ],
            ]
        ];
    }
}
