<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Http\Controllers\DollarValuesController;
use Illuminate\Database\Events\MigrationsEnded;

class GetDollarData
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MigrationsEnded $event): void
    {
        $dollarValuesController = app(DollarValuesController::class);
        $dollarValuesController->getData();
    }
}
