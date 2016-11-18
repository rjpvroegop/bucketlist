<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    header('Content-type: application/json');

    exit(0);
}

include 'controllers/get.php';
include 'controllers/post.php';
include 'controllers/put.php';
include 'controllers/delete.php';

class Api
{
    function fetch($method, $input)
    {
        $data = null;

        // HTTP method
        switch ($method) {
            case 'GET':
                $get = new Get();
                $data = $get->fetch($input);
                break;
            case 'PUT':
                $put = new Put($input);
                $put->fetch($input);
                $data = array('Updated' => true);
                break;
            case 'POST':
                $post = new Post();
                $post->fetch($input);
                $data = array('Posted' => true);
                break;
            case 'DELETE':
                $delete = new Delete();
                $delete->fetch($input);
                $data = array('Deleted' => true);
                break;
        }

        if($data != null){
            return json_encode($data);
        } else {
            return json_encode(array('error' => true, 'method' => $method));
        }
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$api = new Api();

echo $api->fetch($method, $input);