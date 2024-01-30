<?php

namespace App\Http\Controllers;

use App\Models\DollarValues;
use App\Http\Requests\StoreDollarValuesRequest;
use Illuminate\Support\Facades\Http;   
use App\Http\Requests\UpdateDollarValuesRequest;
use Carbon\Carbon;

class DollarValuesController extends Controller
{
    /**
     * Display a listing of the resource.
     */ 
    public function index($startDate, $endDate){

        /*
        dd($request);
        $validatedFields = [
            'startDate' => ['required'],
            'endDate' => ['required']
        ]; 
        $validator = Validator::make($request->all(), $validatedFields);
        */
        
        if (!$startDate){
            $startDate = Carbon::now()->format('Y-m-d');
        }else{
            $startDate =  Carbon::createFromFormat('Y-m-d',  $startDate); 
        }

        if (!$endDate){
            $endDate = Carbon::now()->format('Y-m-d');
        }else{
            $endDate =  Carbon::createFromFormat('Y-m-d',  $endDate); 
        }

        $requestedValues = DollarValues::whereBetween('date', [$startDate, $endDate])->get();
        return $requestedValues;
    }
 
    // This method is called once when the backend begins.
    public function getData()
    {
        $dollarValuess = DollarValues::all();

        if ($dollarValuess->isEmpty()) {
            for ($currentYear = 2023; $currentYear <= 2024; $currentYear++) {
                $url = "https://mindicador.cl/api/dolar/" . $currentYear;
                $response = Http::get($url);
                
                if ($response->successful()) {
                    $data = $response->json();
                    
                    // Check if the response contains valid data
                    if (isset($data['serie']) && is_array($data['serie'])) {
                        foreach ($data['serie'] as $value) {
                            $timestamp = strtotime($value['fecha']);
                            $currentDate = date('Y-m-d H:i:s', $timestamp);

                            $dollarValues = new DollarValues;
                            $dollarValues->date = $currentDate;
                            $dollarValues->value = $value['valor'];
                            $dollarValues->save();
                        }
                    } else {
                        // Log or handle the case where the response is empty or not in the expected format
                        // You might want to log the $response->body() for debugging purposes
                        Log::error('Invalid or empty API response for year ' . $currentYear);
                    }
                } else {
                    // Log or handle the case where the API request was not successful
                    Log::error('Failed API request for year ' . $currentYear);
                }
            }
        }
    }

    // This method is called every hour for updating any changes.
    public function updateData(){
        $dollarValues = DollarValues::all();

        // We get current date to request
        $currentDate = Carbon::now()->format('d-m-Y');
        $url = "https://mindicador.cl/api/dolar/" . $currentDate;
        $response = Http::get($url);
        $data = $response->json();

        // Parse date and value to the new row
        $dollarValues = new DollarValues;
        $dollarValues->date = $currentDate;
        $dollarValues->value = $data['serie'][0]['valor'];

        // Insert to the dollar values table
        $dollarValues->save();
    }
    /**
     * Show the form for creating a new resource.
     */
 
}
