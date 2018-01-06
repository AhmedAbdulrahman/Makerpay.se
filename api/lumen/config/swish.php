<?php

return [
	'api_url' => getenv('ENVIRONMENT') == "prod" ? "https://swicpc.bankgirot.se" : "https://mss.swicpc.bankgirot.se",
];