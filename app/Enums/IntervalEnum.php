<?php

namespace App\Enums;

use Carbon\CarbonInterval;

enum IntervalEnum: string
{
    case DAY   = 'day';
    case WEEK  = 'week';
    case MONTH = 'month';
    case YEAR  = 'year';

    public function toCarbonInterval(): CarbonInterval
    {
        return match ($this) {
            self::DAY   => CarbonInterval::day(),
            self::WEEK  => CarbonInterval::week(),
            self::MONTH => CarbonInterval::month(),
            self::YEAR  => CarbonInterval::year(),
        };
    }
}