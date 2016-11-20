<?php
include 'database/database.php';
include 'model/bucketlist-item.php';

class BucketlistController
{
    function fetchAll()
    {
        $sql = 'SELECT * FROM bucketlist';
        $list = array();

        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();

        foreach ($result as $row) {
            array_push($list, new BucketlistItem($row));
        }

        Database::disconnect();

        return $list;
    }

    function fetchById($id)
    {
        $sql = 'SELECT * FROM bucketlist WHERE id = :id';

        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(":id" => $id));
        $result = $stmt->fetch();

        $list = new BucketlistItem($result);

        Database::disconnect();

        return $list;
    }

    function fetchIdList()
    {
        $sql = 'SELECT id FROM bucketlist';
        $list = array();

        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();

        foreach ($result as $row) {
            array_push($list, $row['id']);
        }

        Database::disconnect();

        return $list;
    }

    function insert($data)
    {
        $sql = "
            INSERT INTO bucketlist (title,description,image,info,completed) 
            values(:title,:description,:image,:info,:completed)
        ";

        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $item = new BucketlistItem($data);
        if (!$item->isValid()){
            http_response_code(422);
            return array(
                'error' => true,
                'message' => 'Invalid data provided: ' . json_encode($data),
                'required' => 'title, description, image'
            );
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
            ":title" => $item->getTitle(),
            ":description" => $item->getDescription(),
            ":image" => $item->getImage(),
            ":info" => $item->getInfo(),
            ":completed" => $item->getCompletedAsInteger()
        ));

        $lastId = $pdo->lastInsertId();

        Database::disconnect();

        $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $actual_link = substr($actual_link, 0, strpos($actual_link, "?"));
        $actual_link .= "?id=$lastId";
        http_response_code(201);
        return $actual_link;
    }

    function update($data)
    {
        $sql = "
            UPDATE bucketlist SET 
            title = :title,
            description = :description,
            image = :image,
            completed=:completed,
            info=:info 
            WHERE id = :id
        ";

        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $item = new BucketlistItem($data);
        if (!$item->isValid() || $item->getId() == null) {
            http_response_code(422);
            return array(
                'error' => true,
                'message' => 'Invalid data provided: ' . json_encode($data),
                'required' => 'id, title, description, image'
            );
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
            ":title" => $item->getTitle(),
            ":description" => $item->getDescription(),
            ":image" => $item->getImage(),
            ":info" => $item->getInfo(),
            ":completed" => $item->getCompletedAsInteger(),
            ":id" => $item->getId()
        ));

        Database::disconnect();

        $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $actual_link = substr($actual_link, 0, strpos($actual_link, "?"));
        $actual_link .= "?id=" . $item->getId();
        http_response_code(201);
        return $actual_link;
    }

    function delete($id)
    {
        $sql = "DELETE FROM bucketlist WHERE id = :id";

        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
            ":id" => $id
        ));

        Database::disconnect();

        $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $actual_link = substr($actual_link, 0, strpos($actual_link, "?"));
        http_response_code(204);
        return null;
    }
}