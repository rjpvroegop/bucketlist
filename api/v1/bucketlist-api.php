<?php
include 'controller/bucketlist-controller.php';

class BucketlistApi
{
    function fetch($method, $input, $path)
    {
        $bucketlist = new BucketlistController();
        $result = array('error' => true);

        switch ($method) {
            case "POST":
                if (isset($input))
                    $result = $bucketlist->insert($input);
                else {
                    http_response_code(422);
                    $result = array('error' => true, 'message' => 'Could not create bucketlist item, no data specified');
                }
                break;
            case "PUT":
                if (isset($input))
                    $result = $bucketlist->update($input);
                else {
                    http_response_code(422);
                    $result = array('error' => true, 'message' => 'Could not update bucketlist item, no data specified');
                }
                break;
            case "DELETE":
                if (isset($path['id'])) {
                    $result = $bucketlist->delete($path['id']);
                }
                else {
                    http_response_code(422);
                    $result = array('error' => true, 'message' => 'Could not remove bucketlist item, no ID specified');
                }
                break;
            default:
                if (isset($path['id'])) {
                    $result = $bucketlist->fetchById($path['id']);
                } else {
                    $result = $bucketlist->fetchAll();
                }
                break;
        }

        return $result;
    }
}