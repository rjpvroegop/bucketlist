<?php
class Delete
{
    function fetch($input)
    {
        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "DELETE FROM `bucketlist` WHERE id = ?";
        $q = $pdo->prepare($sql);

        $value = json_decode(file_get_contents('php://input'), true);

        $id = $value['id'];

        $q->execute(array($id));

        //echo json_encode($list);
        Database::disconnect();
    }
}