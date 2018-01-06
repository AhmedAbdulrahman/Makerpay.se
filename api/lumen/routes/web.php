<?php

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

$router->get('/', function () use ($router)
{
	return $router->app->version();
});

// TODO: Create a new order
// Should be protected by a login token
$router->post("order",      "Order@create");

// TODO: Read an order
// Open for everyhone who have the order_id
$router-> get("order/{id}", "Order@read");

// TODO: Get the payment status (without getting the full order)
// (pending|paid|error|timeout)
$router-> get("order/{id}/status", "Order@paymentStatus");

// TODO: Do a transaction with Stripe
// Skickar en request till Stripe för att genomföra en betalning
// Sparar ner status och skickar info till klient
$router->post("payment/stripe", "Order@createStripeTransaction");

// TODO: Do a transaction with Swish
// Drar iväg en API-request till Swish om att starta en ny betalning
$router->post("payment/swish", "Order@createSwishTransaction");

// TODO: Testing
$router->get("test", "Order@test");