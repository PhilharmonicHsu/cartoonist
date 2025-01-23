<?php

namespace App\Http\Requests;

use App\Enums\ComicStyle;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class GenerateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // 定義驗證規則
            'storySummary' => [
                'required',
                'string'
            ],
            'characterSetting' => [
                'required',
                'string'
            ],
            'styleId' => [
                'required',
                'integer',
                Rule::in(ComicStyle::getStyleIds())
            ]
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
            'message' => 'Invalid Input Data',
        ], 422));
    }
}
