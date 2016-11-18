<?php
class Post
{
    function fetch($input){
        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "INSERT INTO bucketlist (title,description,image,info,completed) values(?, ?, ?, ?, ?)";
        $q = $pdo->prepare($sql);

        $title = $input['title'];
        $description = $input['description'];
        $image = base64_decode($input['image']);
        $info = $input['info'];
        $completed = $input['completed'] ? 1 : 0;

        $q->execute(array($title,$description,$image,$info,$completed));

        Database::disconnect();
    }
}