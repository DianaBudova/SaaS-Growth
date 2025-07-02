<?php

namespace App\Http\Requests\Project;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id'          => ['required', Rule::exists('projects', 'id')],
            'company_id'  => ['required', Rule::exists('companies', 'id')],
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['string', 'max:255', 'nullable'],
            'start_date'  => ['date', 'nullable'],
            'end_date'    => ['date', 'nullable'],
        ];
    }
}
