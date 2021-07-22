<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('register', 'AuthController@register');
    $router->post('login', 'AuthController@login');
    $router->post('logout', 'AuthController@logout');
});


$router->group(['prefix' => 'api', 'middleware' => 'auth'], function () use ($router) {
    $router->get('/', function () use ($router) {
        return $router->app->version();
    });

    $router->post('requestPermission', 'UserController@requestPermission');
});

$router->group(['prefix' => 'api/administrator', 'middleware' => 'auth'], function () use ($router) {
    $router->get('requests', 'AdminController@requests');
    $router->post('handleRequest', 'AdminController@handleRequest');
});

$router->group(['prefix' => 'api/supplier', 'middleware' => 'auth'], function () use ($router) {
    $router->post('add', 'SupplierController@add');
});

$router->group(['prefix' => 'api/courier', 'middleware' => 'auth'], function () use ($router) {
    $router->get('couriers', 'CourierController@couriers');
});

$router->group(['prefix' => 'api/common', 'middleware' => 'auth'], function () use ($router) {
    $router->post('transfer', 'CommonController@transfer');
});
