<?php
class Database
{
    private static $dbName = 'vroegop_pro_bucketl' ;
    private static $dbHost = 'localhost' ;
    private static $dbUsername = 'vroe_pro_bucketl';
    private static $dbUserPassword = 'mmuqtptgvb9492A7bucketlist';

//    private static $dbName = 'bucketlist' ;
//    private static $dbHost = 'localhost' ;
//    private static $dbUsername = 'root';
//    private static $dbUserPassword = 'tester';

    private static $cont  = null;

    public function __construct() {
        die('Init function is not allowed');
    }

    public static function connect()
    {
        // One connection through whole application
        if ( null == self::$cont )
        {
            try
            {
                self::$cont =  new PDO( "mysql:host=".self::$dbHost.";charset=utf8;"."dbname=".self::$dbName, self::$dbUsername, self::$dbUserPassword);
            }
            catch(PDOException $e)
            {
                die($e->getMessage());
            }
        }
        return self::$cont;
    }

    public static function disconnect()
    {
        self::$cont = null;
    }
}