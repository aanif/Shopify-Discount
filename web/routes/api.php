<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopifyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return "Hello API";
});

Route::get('/test',[ShopifyController::class, 'test']);
Route::get('/test1',[ShopifyController::class, 'createCollection']);
Route::get('/test2',[ShopifyController::class, 'getAllCollection']);
Route::get('/test3',[ShopifyController::class, 'createPriceRule']);
Route::get('/test4',[ShopifyController::class, 'test4']);
