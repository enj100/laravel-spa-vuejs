<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function($router){
    Route::post('register', 'UserController@register');
    Route::post('login', 'UserController@authenticate');
    Route::post('logout', 'UserController@logout');
});

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::get('closed', 'DataController@closed');
    //Products
    Route::get('products', 'ProductsController@index');
    Route::get('products/{product}', 'ProductsController@show');
    Route::post('products', 'ProductsController@store');
    Route::put('products/{product}', 'ProductsController@update');
    Route::delete('products/{product}', 'ProductsController@delete');


    //Categories
    Route::get('categories', 'CategoriesController@index');
    Route::get('categories/{category}', 'CategoriesController@show');
    Route::post('categories', 'CategoriesController@store');
    Route::put('categories/{category}', 'CategoriesController@update');
    Route::delete('categories/{category}', 'CategoriesController@delete');


    //Comments
    Route::get('comments', 'CommentsController@index');
    Route::get('comments/{comment}', 'CommentsController@show');
    Route::post('comments', 'CommentsController@store');
    Route::put('comments/{comment}', 'CommentsController@update');
    Route::delete('comments/{comment}', 'CommentsController@delete');
});