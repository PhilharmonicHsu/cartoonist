<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string|null $story_summary
 * @property string|null $character_setting
 * @property int $style
 * @property string $image_url
 * @property array|null $dialog
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic whereCharacterSetting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic whereDialog($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic whereStorySummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic whereStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserComic whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class UserComic extends Model
{
    use HasFactory;

    protected $table = 'user_comic';

    protected $fillable = [
        'id',
        'story_summary',
        'character_setting',
        'style',
        'image_url',
        'dialog'
    ];

    protected $casts = [
        'id' => 'integer',
        'story_summary' => 'string',
        'character_setting' => 'string',
        'style' => 'integer',
        'image_url' => 'string',
        'dialog' => 'array'
    ];
}
