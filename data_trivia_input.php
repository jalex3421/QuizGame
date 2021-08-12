<!-- Author: Alejandro Meza Tudela
     Purpose: create connection with database, insert usernames-->
<?php
use MongoDB\BSON\ObjectID;
    if(isset($_POST['username'])){
        $current_user = array('username'=> $_POST['username']);
    }
    //OK
    //echo $current_user['username'];
    try{
        //At this point , our principal task is to register the username in the database
        if(extension_loaded("mongodb")){
            //create localhost connection
            $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
            //--- Maybe useful for following versions-----------------------------------------
            //this query will get all the documents
            //$query = new MongoDB\Driver\Query([]);
            //execute query and then iterate over results
            //$cursor = $manager->executeQuery("Trivia.Usernames");
            //show all the stuff
            //foreach ($cursor as $doc){
            //    var_dump($doc);
            //}
            //---------------------------------------------------------------------------------
            $bulkWriteManager = new MongoDB\Driver\BulkWrite;
            //initialize the player and insert it on the database
            $bulkWriteManager->insert(['username' =>$current_user['username'] , 'score'=>0]);
            //If everything goes allright!
            try {
                $result = $manager->executeBulkWrite('Trivia.Usernames', $bulkWriteManager);
                $content = file_get_contents("play_trivia.html");
                $content= str_replace("##username##", $current_user['username'], $content);
                //$content= str_replace("##id_mongodb##", $result->getInsertedId(), $content);
                echo "$content";
            //otherwise
            } catch (MongoCursorException $e) {
                //handle the exception
                echo 0;
            }
        }
    }catch (MongoConnectionException $e){
        var_dump($e);
    }
?>

