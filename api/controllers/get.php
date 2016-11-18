<?php
include 'database.php';

class Get
{
    function fetch($input)
    {
        $pdo = Database::connect();
        $result = null;

        if (isset($_SERVER['PATH_INFO']) && !empty($_SERVER['PATH_INFO'])) {
            $request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
            $key = array_shift($request) + 0;

            $result = $this->fetch_one($pdo, $key);
        } else {
            $result = $this->fetch_list($pdo);
        }

//        print_r($list);

        Database::disconnect();
        return $result;

    }

    function fetch_list($pdo)
    {
        $sql = 'SELECT * FROM bucketlist';
        $list = array();
        foreach ($pdo->query($sql) as $row) {
            $item = array();
            $item['id'] = $row['id'];
            $item['title'] = $row['title'];
            $item['description'] = $row['description'];
            $item['image'] = base64_encode($row['image']);
            $item['completed'] = $row['completed'] == 0 ? false : true;
            $item['info'] = $row['info'];
            array_push($list, $item);
        }
        return $list;
    }

    function fetch_one($pdo, $id)
    {
        $sql = "SELECT * FROM bucketlist WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $result = $stmt->execute(array(":id" => $id));
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        $item = array();
        $item['id'] = $data['id'];
        $item['title'] = $data['title'];
        $item['description'] = $data['description'];
        $item['image'] = base64_encode($data['image']);
        $item['completed'] = $data['completed'] == 0 ? false : true;
        $item['info'] = $data['info'];

        return $item;
    }
}
//
//include 'database.php';
//class Get
//{
//    function fetch($input){
//        $pdo = Database::connect();
//
//        $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
//        $key = array_shift($request)+0;
//
//        print_r($key);
//
//        $sql    = "SELECT * FROM bucketlist WHERE id = :id";
//        $stmt   = $pdo->prepare($sql);
//        $result = $stmt->execute(array(":id" => $key));
//        $data   = $stmt->fetch(PDO::FETCH_ASSOC);
//
//        $item = array();
//        $item['id'] = $data['id'];
//        $item['title'] = $data['title'];
//        $item['description'] = $data['description'];
//        $item['image'] = base64_encode($data['image']);
//        $item['completed'] = $data['completed'];
//        $item['info'] = $data['info'];
//
////        print_r($list);
//
//        Database::disconnect();
//        return $item;
//    }
//}