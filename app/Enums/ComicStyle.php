<?php

namespace App\Enums;

enum ComicStyle: int
{
    case JAPANESE = 1;
    case WESTERN = 2;
    case FANTASY = 3;
    case DOOMSDAY = 4;

    public static function getStyleById(int $typeId): string {
        return match ($typeId) {
            self::JAPANESE->value => 'Japanese manga-style comic scene',
            self::WESTERN->value => 'European comic-style scene',
            self::FANTASY->value => 'Fantasy comic-style scene',
            self::DOOMSDAY->value => 'Post-apocalyptic comic-style scene',
            default => 'comic-style scene',
        };
    }
}
