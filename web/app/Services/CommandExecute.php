<?php

namespace App\Services;

class CommandExecute
{
    //
    private $descriptorspec = [
		0 => [
			"pipe",
			"r"
		], // stdin is a pipe that the child will read from
		1 => [
			"pipe",
			"w"
		], // stdout is a pipe that the child will write to
		2 => [
			"pipe",
			"w"
		] // stderr is a pipe the the child will read
	];

    public function exec($cmd)
	{ 
		$errors = [];
		$response = [
			'error' => '',
			'success' => ''
		];
		$resource = proc_open($cmd, $this->descriptorspec, $pipes);
		if (is_resource($resource)) {
			fclose($pipes[0]);
			$response['success'] = stream_get_contents($pipes[1]);
			while (!feof($pipes[2])) {
				array_push($errors, trim(fgets($pipes[2], 1024), "\n"));
			}
			$errors = array_filter($errors);
			$response['error'] = is_array($errors) && !empty($errors) ? $errors : '';
			fclose($pipes[2]);
			fclose($pipes[1]);
			proc_close($resource);
		}
		return $response;
	}

}
