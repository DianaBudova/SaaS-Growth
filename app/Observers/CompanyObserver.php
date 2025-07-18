<?php

namespace App\Observers;

use App\Models\Company;
use Illuminate\Support\Facades\Cache;

class CompanyObserver
{
    public function saved(Company $company)
    {
        Cache::forget('companies');
    }

    public function deleted(Company $company)
    {
        Cache::forget('companies');
    }
}
