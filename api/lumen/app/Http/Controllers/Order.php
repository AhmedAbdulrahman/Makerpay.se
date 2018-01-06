<?php

namespace App\Http\Controllers;

use App\Libraries\CurlBrowser;

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

	/**
	 *
	 */
	public function test()
	{
		echo "<pre>";

		// Get Payment Request
		$paymentRequest = $this->_swishGetPaymentRequest("63274445C66C4B42933FC7C6B3B2A3F8"); // 6B31D46951F742378CBD1BAE6B0EAA31

/*
		// Create Payment Request
		$data = 
		[
			"payeePaymentReference" => "0123456789",
			"callbackUrl" => "https://swishbackend.makerspace.se/api/swishcb/paymentrequests",
			"payerAlias" => "4671234768",
			"payeeAlias" => "1231181189",
			"amount" => "100",
			"currency" => "SEK",
			"message" => "Kingston USB Flash Drive 8 GB"
		];
		$paymentRequest = $this->_swishCreatePaymentRequest($data);
*/

		// Debug
		print_r($paymentRequest);

		return "";
	}

	private function _swishCall($method, $url, $post = [])
	{
		// Initialize cURL
		$ch = new CurlBrowser;
		$ch->useJson();

		// Load certificates
		$ch->setRootCert("/var/www/server.crt");
		$ch->setClientCert("/var/www/client.crt");
		$ch->setClientKey("/var/www/client.key");

//		if(($result = $ch->call($method, $url, [], $post)) == NULL)
		// TODO: Error handling
		$result = $ch->call($method, $url, [], $post);
		if(false)
		{
			$error = $ch->Error();
			echo "Error running cURL request: {$error}\n";
			// TODO: Throw an error
		}

		return $ch;
	}

	/**
	 * Create a payment request and return its id, or false
	 */
	private function _swishCreatePaymentRequest($data)
	{
		// Create payment request
		$ch = $this->_swishCall("POST", config("swish.api_url") . "/swish-cpcapi/api/v1/paymentrequests", $data);

		if($ch->getStatusCode() == 201)
		{
			$headers = $ch->getResponseHeaders();
			$url = $headers["Location"];

			// Get id by stripping away the first part of the URL
			$id = substr($url, 68);

			return $id;
		}
		else
		{
//			$status = $ch->getStatusCode();
//			echo "HTTP status code: {$status}\n";
			// TODO: Error handling
			return false;
		}
	}

	private function _swishGetPaymentRequest($id)
	{
		$ch = $this->_swishCall("GET", config("swish.api_url") . "/swish-cpcapi/api/v1/paymentrequests/{$id}");
		return $ch->getJson();
	}
}