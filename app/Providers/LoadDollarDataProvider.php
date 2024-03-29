<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use app\Http\Controllers\DollarValuesController;

class LoadDollarDataProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $dollarValuess = new DollarValuesController();
        $dollarValuess->getData();
    }
}
