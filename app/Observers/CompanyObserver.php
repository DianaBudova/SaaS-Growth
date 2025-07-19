<?php

namespace App\Observers;

use App\Models\Company;
use Illuminate\Support\Facades\Cache;

class CompanyObserver
{
    public function saved(Company $company)
    {
        Cache::forget('companies');
        Cache::forget("company_{$company->id}_users");
    }

    public function deleting(Company $company)
    {
        Cache::forget('companies');
        Cache::forget("company_{$company->id}_users");
    }
}
