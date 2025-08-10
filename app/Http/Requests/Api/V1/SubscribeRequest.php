<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubscribeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'stripe_price_id' => [
                'required', 'string',
                Rule::exists('plans', 'stripe_price_id')->where('active', true),
            ],
            'payment_method' => ['required', 'string'],
        ];
    }
}
