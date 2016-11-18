<?php
class Put
{
    function fetch($input){
        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "UPDATE bucketlist SET title = :title,description = :description,image = :image,completed=:completed,info=:info WHERE id = :id";
        $q = $pdo->prepare($sql);

        $title = $input['title'];
        $description = $input['description'];
        $image = base64_decode($input['image']);
        $info = $input['info'];
        $completed = $input['completed'] ? 1 : 0;
        $id = $input['id'];

        $q->execute(array(":title" => $title,":description"=>$description,":image"=>$image,":info"=>$info,":completed"=>$completed,":id"=>$id));

        Database::disconnect();
    }
}