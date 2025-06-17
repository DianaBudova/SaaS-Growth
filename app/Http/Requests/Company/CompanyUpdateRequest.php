<?php

namespace App\Http\Requests\Company;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => ['required', Rule::exists('companies', 'id')],
            'name' => ['required', 'string', 'max:255'],
        ];
    }
}
