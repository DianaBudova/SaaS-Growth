<?php

namespace App\Http\Requests\Company;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectCreateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'company_id'  => ['required', Rule::exists('companies', 'id')],
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['optional', 'string', 'max:255'],
            'start_date'  => ['optional', 'date'],
            'end_date'    => ['optional', 'date'],
        ];
    }
}
