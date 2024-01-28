<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use app\Http\Controllers\ValorDolarController;

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
        $dolarValues = new ValorDolarController();
        $dolarValues->getData();
    }
}
