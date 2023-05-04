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

Route::get('/product',[ShopifyController::class, 'getProducts']);//
Route::post('/collection',[ShopifyController::class, 'createCollection']);//
Route::get('/priceRule',[ShopifyController::class, 'getAllPriceRules']);//
Route::get('/priceRule/{id}',[ShopifyController::class, 'getPriceRule']);//
Route::post('/priceRule',[ShopifyController::class, 'createPriceRule']);//
Route::put('/priceRule/{id}',[ShopifyController::class, 'updatePriceRule']);//
Route::delete('/priceRule/{id}',[ShopifyController::class, 'deletePriceRule']);
