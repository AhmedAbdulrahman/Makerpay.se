<?php

namespace App\Http\Controllers;

class Order extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
	}

	/**
	 *
	 */
	public function create()
	{
		return "create";
	}

	/**
	 *
	 */
	public function read()
	{
		return "read";
	}

	/**
	 *
	 */
	public function paymentStatus()
	{
		return "paymentStatus";
	}

	/**
	 *
	 */
	public function createStripeTransaction()
	{
		return "createStripeTransaction";
	}

	/**
	 *
	 */
	public function createSwishTransaction()
	{
		return "createSwishTransaction";
	}
}