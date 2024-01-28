<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;   
use App\Models\ValorDolar;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;


class ValorDolarController extends Controller
{
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

        
        
        $requestedValues = ValorDolar::whereBetween('date', [$startDate, $endDate])->get();
        return $requestedValues;
    }
 
    // This method is called once when the backend begins.
    public function getData(){
        $valorDolar = ValorDolar::all();
        
        if(count($valorDolar) == 0){
            for($currentYear = 2023 ; $currentYear <= 2024 ; $currentYear ++){
                $url = "https://mindicador.cl/api/dolar/" . $currentYear;
                $response = Http::get($url);
                $data = $response->json();
                // We get data for the first time
                    // We need to go through the array
                for($i = 0; $i < count($data['serie']) ; $i++){
                    $valorDolar = new ValorDolar;
                    $timestamp = strtotime($data['serie'][$i]['fecha']);
                    $currentDate = date('Y-m-d H:i:s', $timestamp);
                    $valorDolar->date = $currentDate;
                    $valorDolar->value = $data['serie'][$i]['valor'];
                    $valorDolar->save();
                }
            }
        }
    }

    // This method is called every hour for updating any changes.
    public function updateData(){
        $valorDolar = ValorDolar::all();

        // We get current date to request
        $currentDate = Carbon::now()->format('d-m-Y');
        $url = "https://mindicador.cl/api/dolar/" . $currentDate;
        $response = Http::get($url);
        $data = $response->json();

        // Parse date and value to the new row
        $valorDolar = new ValorDolar;
        $valorDolar->date = $currentDate;
        $valorDolar->value = $data['serie'][0]['valor'];

        // Insert to the dollar values table
        $valorDolar->save();
    }
}

